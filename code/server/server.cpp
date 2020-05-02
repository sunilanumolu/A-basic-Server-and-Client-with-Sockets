
#define PORT 8080
#define SIZE 1024
#include "string.h"

#include <stdlib.h>
#include <errno.h>
#include <unistd.h> //close
#include <arpa/inet.h> //close
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <sys/time.h> //FD_SET, FD_ISSET, FD_ZERO macros
#include <fcntl.h>
#include <iterator>
#include <iostream>
#include <fstream>
#include <algorithm>
#include <iterator>
#include <iostream>
#include <string>
#include <cstdlib>
#include <dirent.h>

std::ifstream::pos_type filesize(const char* filename)
{
    std::ifstream in(filename, std::ifstream::ate | std::ifstream::binary);
    return in.tellg();
}

int send_file(int sock, char* filename)
{
    char b[1024];
    int l;
    int fd = open(filename, O_RDONLY);
    if(fd<0){ 
        printf("error\n"); 
        return -1; 
    }

    int size = filesize(filename);
    send(sock, &size, sizeof(int), 0);
printf("%d\n", size);

    while(size > 0)
    {
        printf("size->%d\n",size);
        l=read(fd, b, sizeof(b));
        if (l<=0) break;
        send(fd, b, l, 0);
        size-=l;
    }

}

int main(int argc, char const *argv[])
{
    char delim[] = " \t\n";
char* buffer_ptr;
char** args;
args = (char**)malloc(sizeof(char)*100);
    int server_fd, new_socket, valread;
    struct sockaddr_in address;  // sockaddr_in - references elements of the socket address. "in" for internet
    int opt = 1;
    int addrlen = sizeof(address);
    char buffer[1024] = {0};
    char *hello = "Hello from server";

    // Creating socket file descriptor
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == 0)  // creates socket, SOCK_STREAM is for TCP. SOCK_DGRAM for UDP
    {
        perror("socket failed");
        exit(EXIT_FAILURE);
    }

    // This is to lose the pesky "Address already in use" error message
    if (setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR | SO_REUSEPORT,
                                                  &opt, sizeof(opt))) // SOL_SOCKET is the socket layer itself
    {
        perror("setsockopt");
        exit(EXIT_FAILURE);
    }
    address.sin_family = AF_INET;  // Address family. For IPv6, it's AF_INET6. 29 others exist like AF_UNIX etc.
    address.sin_addr.s_addr = INADDR_ANY;  // Accept connections from any IP address - listens from all interfaces.
    address.sin_port = htons(PORT);    // Server port to open. Htons converts to Big Endian - Left to Right. RTL is Little Endian

    // Forcefully attaching socket to the port 8080
    if (bind(server_fd, (struct sockaddr *)&address,
                                 sizeof(address))<0)
    {
        perror("bind failed");
        exit(EXIT_FAILURE);
    }

    // Port bind is done. You want to wait for incoming connections and handle them in some way.
    // The process is two step: first you listen(), then you accept()
    if (listen(server_fd, 3) < 0) // 3 is the maximum size of queue - connections you haven't accepted
    {
        perror("listen");
        exit(EXIT_FAILURE);
    }

    // returns a brand new socket file descriptor to use for this single accepted connection. Once done, use send and recv
    if ((new_socket = accept(server_fd, (struct sockaddr *)&address,
                       (socklen_t*)&addrlen))<0)
    {
        perror("accept");
        exit(EXIT_FAILURE);
    }

    // valread = read( new_socket , buffer, 1024);  // read infromation received into the buffer
    // printf("%s\n",buffer );
    send(new_socket , hello , strlen(hello) , 0 );  // use sendto() and recvfrom() for DGRAM
    // printf("Hello message sent\n");

    char buff[SIZE]; 
    int n, loop = 0; 
    while(!loop) 
    { 
         bzero(buff, sizeof(buff)); 
  
        // read the message from client and copy it in buffer 
        read(new_socket, buff, sizeof(buff)); 
        // print buffer which contains the client contents 
        printf("From client: %s\n To client : ", buff); 
        // bzero(buff, sizeof(buff)); 
        n = 0; 
        // copy server message in the buffer 
        // while ((buff[n++] = getchar()) != '\n'); 
  
        // and send that buffer to client 
        // send(new_socket, buff, sizeof(buff), 0); 
  
        // if msg contains "Exit" then server exit and chat ended.
        buffer_ptr = strtok(buff, delim);

        // Divide them into arguments
        for(int ind=0;buffer_ptr != NULL; ind++)
        {

            args[ind] = buffer_ptr;
            buffer_ptr = strtok(NULL, delim);
        } 

        if (strncmp(args[0], "exit", 4) == 0) { 
            printf("Server Exit\n"); 
            loop = 1; 
        } 
        if((strncmp(args[0], "send", 4)) == 0) { 
            // send(sock, buff, sizeof(buff), 0);
            send_file(new_socket, args[1]);
            printf("Client send\n"); 
        } 
        if((strncmp(args[0], "listall", 6)) == 0) { //listall for listing all files
            // send(sock, buff, sizeof(buff), 0);
            printf("Client listall\n"); 
        } 
    } 
 

    return 0;
}
