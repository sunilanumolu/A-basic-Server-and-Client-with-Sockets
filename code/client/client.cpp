// Client side C/C++ program to demonstrate Socket programming
#define PORT 8080
#define SIZE 1024

#include <stdio.h>
#include <sys/socket.h>
#include <stdlib.h>
#include <unistd.h>
#include <netinet/in.h>
#include <string.h>
#include <arpa/inet.h>
#include <iostream>
#include <fcntl.h>

int send_file(int sock, char* b)
{
    char var[1024];
    int sz,l;
    recv(sock, &sz, sizeof(int), 0);
    int fd = open("temp.txt", O_CREAT|O_WRONLY, 0777);
    setbuf(stdout, NULL);    
    while(sz>0)
    {   
        printf("sz -> %d\n",sz );
        l=recv(sock, var, 10, 0);
        printf("sz4 -> %d\n",sz );
        if (l<=0) break;
        var[l] = '\0';
        write(fd, var, l);
        sz-=l;
        printf("sz2 -> %d\n",sz );
    }
    printf("sz3 -> %d\n",sz );
    return 0;
}

int main(int argc, char const *argv[])
{
    struct sockaddr_in address;
    int sock = 0, valread;
    struct sockaddr_in serv_addr;
    char *hello = "Hello from client";
    char buffer[1024] = {0};
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0)
    {
        printf("\n Socket creation error \n");
        return -1;
    }

    memset(&serv_addr, '0', sizeof(serv_addr)); // to make sure the struct is empty. Essentially sets sin_zero as 0
                                                // which is meant to be, and rest is defined below

    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);

    // Converts an IP address in numbers-and-dots notation into either a
    // struct in_addr or a struct in6_addr depending on whether you specify AF_INET or AF_INET6.
    if(inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr)<=0)
    {
        printf("\nInvalid address/ Address not supported \n");
        return -1;
    }

    if (connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0)  // connect to the server address
    {
        printf("\nConnection Failed \n");
        return -1;
    }

    // send(sock , hello , strlen(hello) , 0 );  // send the message.
    // printf("Hello message sent\n");
    valread = read( sock , buffer, 1024);  // receive message back from server, into the buffer
    printf("%s\n",buffer );

    char buff[SIZE]; 
    int n, loop = 0; 
    while(!loop) 
    { 
        bzero(buff, sizeof(buff)); 
        printf(">>>> "); 
        n = 0; 
        std::cin.getline(buff, 100);
        // send(sock, buff, sizeof(buff), 0); 

        // bzero(buff, sizeof(buff)); 
        // read(sock, buff, sizeof(buff)); 
        // printf("From Server : %s", buff);


        if((strncmp(buff, "exit", 4)) == 0) { 
            printf("Client Exit\n"); 
            loop = 1; 
        } 
        if((strncmp(buff, "send", 4)) == 0) { //send for requesting for a file
            send(sock, buff, sizeof(buff), 0);
            send_file(sock, buff);
            printf("Client send\n"); 
        } 
        if((strncmp(buff, "listall", 6)) == 0) { //listall for listing all files
            send(sock, buff, sizeof(buff), 0);
            printf("Client listall\n"); 
        } 
    } 

    return 0;
}
