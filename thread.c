#include <stdio.h>
#include <pthread.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>

#ifndef THREAD_CNT
#define THREAD_CNT 2
#endif

pthread_key_t thread_key;

int g_i = 0;

pthread_mutex_t mutex;

void clearfunc(void * param)
{
	FILE * p = (FILE*)param;
	fclose(p);
}

void writelog(void *data, int nlen)
{
	FILE * p = (FILE*)pthread_getspecific(thread_key);
	fprintf(p, "%s", data);
}

void * thread(void *ptr)
{
#ifdef LOG_TEST
	pthread_t t = pthread_self();
	char filename[20] = {0};
	sprintf(filename, "thread_log_%d", (int)t);
	FILE * file = fopen(filename, "a");
	pthread_setspecific(thread_key, file);
	writelog(ptr, 0);
#endif
	int i;
	int ret = 0;
	for(i = 0; i < 10; i++)
	{
		pthread_mutex_lock(&mutex);
		g_i++;
		printf("%d\n", g_i);
		pthread_mutex_unlock(&mutex);
	}
	return 0;
}

int main()
{
	pthread_key_create(&thread_key, clearfunc);
	pthread_t id[THREAD_CNT];
	int i;
	pthread_attr_t attr;
	pthread_attr_init(&attr);
	// 绑定状态
	pthread_attr_setscope(&attr, PTHREAD_SCOPE_SYSTEM);
	// 非绑定状态
	pthread_attr_setscope(&attr, PTHREAD_SCOPE_PROCESS);
	// 分离状态
	pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_DETACHED);
	// 非分离状态
	pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_JOINABLE);

	// 设置属性
	struct sched_param param;
	int newprio = 20;
	pthread_attr_getschedparam(&attr, &param);
	// 设置优先级
	param.sched_priority = newprio;
	pthread_attr_setschedparam(&attr, &param);

	pthread_mutexattr_t mutexattr;
	pthread_mutexattr_settype(&mutexattr, PTHREAD_MUTEX_NORMAL);
	pthread_mutex_init(&mutex, &mutexattr);

	char data[10] = {0};
	for(i = 0; i < THREAD_CNT; i++)
	{
		sprintf(data, "%d\n", i);
		pthread_create(&id[i], &attr, thread, (void*)data);
	}

	for(i=0;i<THREAD_CNT;i++)
	{
		pthread_join(id[i], NULL);
	}
	pthread_key_delete(thread_key);
	if( pthread_mutex_destroy(&mutex) == EBUSY )
	{
		printf("mutex is locked,%d\n", EBUSY);
		pthread_mutex_unlock(&mutex);
		pthread_mutex_destroy(&mutex);
	}
	
	return 0;
}
