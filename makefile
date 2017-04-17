ROOT = .
PROGRAM = $(ROOT)/thread
LDFLAGS = -lpthread
FULLOBJS = $(ROOT)/thread.c
CC  = gcc
RM = rm -f
SHELL = /bin/bash
.PHONY : all clean
all : $(PROGRAM)
$(PROGRAM) : $(OBJS)
	$(CC) -o $(PROGRAM) $(FULLOBJS) $(LDFLAGS)
clean:
	@$(RM) $(PROGRAM)
