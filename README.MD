# Node Wave Base Repositories for Backend - Immanuel


## Explanation

The following are my submitted back-end files for Nodewave, the following rules previously mentioned on GitHub and Notion are also considered
- Validations done on /validations instead of /controller
- No 3rd party library were used (except JWT)
- Postman tests are also included

Some additional note to add
- The JWT on this project has to be manually despite the previous claimed that "all libraries are included in the template", this meant that JWT is the only external library installed, tho the instructions specifically requested JWT for register / login request
- The authentication are used for register and login, while back-end includes uploading excel files, filtering based on file's name, and pagination to show all files stored in the server
- The postman's test include :
  - Register test
  - Login test
  - File upload
  - File filtering based on name
  - Show all file stored
