const url = "https://60f2ef2d6d44f30017788813.mockapi.io/posts";

//Get Data from API
database();
async function database() {
  try {
    var res = await fetch(url);
    var data = await res.json();
    display(data);
  } catch (err) {
    console.log(err);
  }
}

// Form to post the query
function foo() {
  var ele = document.getElementById("mpage");
  ele.innerHTML = `<div class="modal-header">
    <h5 class="modal-title">Create a post </h5>
    <button type="button" class="close" onclick="closetab()" data-dismiss="modal" aria-label="Close">
          <span id="mul" aria-hidden="true">&times;</span>
        </button>

   </div>
   <div class="modal-body">
   <form>
   <div class="mb-1">
   <label for="name" class="form-label fs-6">Name</label>
   <input type="text" class="form-control fs-6" placeholder="Enter the name" id="data1">
   </div>
   <div class="mb-1">
   <label for="password" class="form-label fs-6">Password</label>
   <input type="password" class="form-control" placeholder="Enter password (to delete post)"  id="p-word">
   </div>
   <div class="mb-1">
   <label for="title" class="form-label fs-6">Title</label>
   <input type="text" class="form-control" placeholder="Enter post title"  id="title">
      </div>

      <div class="mb-1">
   <label for="query" class="form-label fs-6">Query</label>
   <textarea class="form-control"  id="description"placeholder="Enter query"  cols="2" rows="2"></textarea>
   </div>
   </form>
    
   </div>
   <div class="modal-footer">
   <button type="submit" onclick="postdata()" class="btn btn-primary" data-dismiss="modal" >Create</button>
   </div>
`;
}
var password;

//send post request to  api
async function postdata() {
  try {
    var name = document.getElementById("data1").value;
     password = document.getElementById("p-word").value;
    var Title = document.getElementById("title").value;
    var Query = document.getElementById("description").value;
    let res = await fetch(url, {
      method: "Post",
      body: JSON.stringify({ name, password, Title, Query }),
      headers: {
        "Content-type": "application/json",
      },
    });
    //alert("successfully posted");
    document.querySelector("form").innerHTML = "";

    bodyclear();

    database();
  } catch (err) {
    console.log(err);
  }
}
// Clears the page body for updated
function bodyclear() {
  document.getElementById("tbody").innerHTML = "";
}
// Display the Data on page
function display(data) {
  var main = document.getElementById("tbody");
  var ele = document.createElement("div");
  ele.setAttribute("class", "row");

  data.forEach((element) => {
    ele.innerHTML += `<div class="col-3  mb-3 ">
       <div class ="card h-100 w-100" onclick = "commentpage(${element.id})" onclick="commentsbox(${element.id})" data-toggle="modal" data-target="#action1" >
       <div class="card-body" >
       <h5 class="card-title qtitle fw-bold">${element.Title}</h5>
       
       <p class="card-text qtext fw-lighter"><span id="whiteit">Created by</span> ${element.name}</p>
       </div> 
     </div>
     </div>
     `;
  });
  main.append(ele);
}

function closetab() {
  document.querySelector("form").innerHTML = "";
}

async function commentpage(id) {
  //alert('working' + id);
  let a = commentsbox(id);
  let val = await fetch(url + "/" + id);
  let data = await val.json();

  let val1 = await fetch(url+"/"+id+"/Comments")
  let data1 = await val1.json();
  console.log(data1);
  var listofcomments =[];
  
   data1.forEach((ele)=>{
      listofcomments += `
      <div id="listd">
      
      <h5>${ele.Comments}</h5>
      <footer>
      
      </div>
      <p><span id="whiteit">Created by</span> ${ele.name}</p> </footer>
      <hr>
      `

  })
  
  console.log(listofcomments)
  ele = document.getElementById("action1");

  ele.innerHTML = ` 
  
          <span id="new"  class="ml-5" data-dismiss="modal">&larr;</span>
        
  <button type="button" class="close" onclick="closetab()" data-dismiss="modal" aria-label="Close">
          <span id="mul" aria-hidden="true">&times;</span>
        </button>
   <h3 class="text-center" >${data.Title}</h3>
  <p class="text-center"><span id="whiteit">Created by</span> ${data.name}</p>
  <p class="m-4">${data.Query}</p>
  
   
  <button class="btn btn-primary ml-5 " type="submit" data-toggle="modal" data-target="#cform" onclick="newpage(${data.id})">Add comment</button>
  <button class="btn btn-primary ml-3" onclick="deletepost(${data.id})" type="submit" data-toggle="modal" data-target="#form1">Delete post</button>
 
  
  <h3 class="mt-5 " id="cheading">Comments </h3>`+listofcomments;


/*
var ele = document.getElementById('cheading');
    ele.innerHTML=`
     

    `
*/

}

/*
<div class="col-9">
       <div class ="card "  >
       <div class="card-body" >
       </div> 
     </div>
     </div>  
*/
async function operate(data) {
   let pa = document.getElementById('deletepword').value;
   
   console.log(url+"/"+data)
   try{
      var res = await fetch(url+"/"+data);
    var dataa = await res.json();
    var postedpas = dataa.password;
    if(pa==postedpas){
       
         let ele = fetch(url+"/"+data,{
            method:"Delete",
         })
         $(document).ready(function(){
            $('#action1').trigger('click');
          });
          bodyclear();
          alert('Post Deleted')
           
             
      
           database(); 

      
    }
    else{
       alert('Please enter correct password')
    }
      
      


   }
   catch(err){
      console.log(err);
   }
       
       
    
   
}

//Delete the post
function deletepost(data) {
  var ele = document.getElementById("form1");
  ele.innerHTML = `<div class="modal-header">
   <h5 class="modal-title">Enter Password to delete post </h5>
   <button type="button" class="close" onclick="closetab()" data-dismiss="modal" aria-label="Close">
         <span id="mul" aria-hidden="true">&times;</span>
       </button>

       </div>
       <div class="modal-body">
       <form>
       <div class="mb-1">
   <label for="password" class="form-label fs-6">Password</label>
   <input type="password" class="form-control" placeholder="Enter password (to delete post)"  id="deletepword">
   </div>
   
   </form>
      


       <div class="modal-footer">
   <button type="submit" data-dismiss="modal" onclick="operate(${data})" class="btn btn-primary" >Delete</button>
   </div>
         


 `;
}
function newpage(id){
  
   
   var ele = document.getElementById("cform");
  ele.innerHTML = `<div class="modal-header">
   <h5 class="modal-title">Post the Comment </h5>
   <button type="button" class="close" onclick="closetab()" data-dismiss="modal" aria-label="Close">
         <span id="mul" aria-hidden="true">&times;</span>
       </button>

       </div>
       <div class="modal-body">
       <form>
       <div class="mb-1">
   <label for="Name" class="form-label fs-6">Name</label>
   <input type="text" class="form-control" placeholder="Enter name"  id="cuser">
   </div>
   <div class="mb-1">
   <label for="query" class="form-label fs-6">Comment</label>
   <textarea class="form-control"  id="cdescr"placeholder="Enter the text"  cols="2" rows="2"></textarea>
   </div>

       </form>
       </div>


       <div class="modal-footer">
   <button type="submit" data-dismiss="modal" onclick="postcomment(${id})" class="btn btn-primary" >Post</button>
   </div>
   `
   
}
async function postcomment(postId){
   
   let yri =url+"/"+postId+"/Comments";
   var Comments= document.getElementById('cdescr').value;
   var name = document.getElementById('cuser').value
   console.log(Comments)
   try{
      let res = await fetch(yri, {//https://60f2ef2d6d44f30017788813.mockapi.io/posts/3/Comments
         method: "Post",
         body: JSON.stringify({Comments, name}),
         headers: {
           "Content-type": "application/json",
         },
        
       });
     
       
       alert('comment posted')
       commentpage(postId);
       

   }
  
   catch(err){
      console.log(err);
   }
   



}

async function commentsfetch(id){
   let yri =url+"/"+id+"/Comments";
   
      var newset = await fetch(yri);
      var clis = await newset.json();
        
   
   callfun1(clis);

   

   
}
function commentsbox(id){
 
   
   a=`<p>lorem4000  completed checkup zjjaujjs + ${id}</p>`
  
   
   return a;

  
}