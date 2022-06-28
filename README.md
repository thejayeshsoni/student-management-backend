# student-application 🧑‍🎓 
Basic CRUD Application <ins>[LIVE PREVIEW](https://student-management-webapps.herokuapp.com/api-docs/)</ins>
### Problem Statement- Create a CRUD Operations for a Student Application having the following functionality.
<ol>
   <li>Admin can register the students and circulate the StudentID to respective Student</li>
   <li>Admin can update the total marks plus marks in every subject in the system</li>
   <li>Students can log-in using the StudentId and in response get the Authentication Token used for further APIs</li>
   <li>Using the AuthToken Student can view the detailed results or total marks or percentages only (used query parameters here)</li>
   <li>Admin only can delete the student record</li>
</ol>
### Rest Endpoints-
<ol>
   <li>
      <b>POST /student/login</b>
      <ul>
         <li>Students pass their studentID in the form data</li>
         <li>API should check StudentID exists or not if exists send authToken in response with 200 else return 404</li>
      </ul>
   </li>
   <br>
   <li>
      <b>GET /student/results</b>
      <ul>
         <li>Middleware to verify the authentication token present in the header</li>
         <li>Return the status with a proper error message if a token is invalid</li>
         <li>Students can filter the results by passing any subject name, In this case, only specified subject marks would return</li>
      </ul>
   </li>
   <br>
   <li>
      <b>GET /me</b>
      <ul>
         <li>Middleware to verify the authentication token present in the header</li>
         <li>Student can view their details inserted by Admin like family background, mobile no. course details etc.</li>
      </ul>
   </li>
   <br>
   <li>
      <b>PUT /student/update</b>
      <ul>
         <li>Middleware to verify the authentication token present in the header</li>
         <li>Students can update their personal details</li>
      </ul>
   </li>
   <br>
   <li>
      <b>POST /admin/login</b>
      <ul>
         <li>Admin pass the AdminId in form data </li>
         <li>API should check StudentID exists or not if exists send authToken in response with 200 else return 404</li>
      </ul>
   </li>
   <br>
   <li>
      <b>POST /admin/addStudent</b>
      <ul>
         <li>Middleware to verify the authentication token present in the header</li>
         <li>Insert the new record of the Student and in response return the Student ID</li>
      </ul>
   </li>
   <br>
   <li>
      <b>PUT /admin/students/id</b>
      <ul>
         <li>Middleware to verify the authentication token present in the header</li>
         <li>Update the student record</li>
      </ul>
   </li>
   <br>
   <li>
      <b>DELETE /admin/students/id</b>
      <ul>
         <li>Middleware to verify the authentication token present in the header</li>
         <li>Delete the student record</li>
      </ul>
   </li>
</ol>
<br>
Consideration 
<ul>
   <li>Use MongoDB as Database </li>
   <li>Use Middleware to validate token</li>
   <li>Follow SOLID Principles while writing the code </li>
   <li>Create the Swagger Doc for all endpoints</li>
</ul>
