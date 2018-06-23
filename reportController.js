// ----------------------------------------------controller report 4-------------------------------------------------------------------------
angular.module('playerApp')
  .controller('ReportController4',
        function($scope,$http)
        {
            $scope.show_graph=true;
            $scope.show_table=true;
            $scope.show=true;
            $http({
                method: 'POST',
                url: 'http://localhost:8080/getCourses',
                data:"id=96821",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                function(res)
                {
                    console.log("successfully got college data");
                    if(res.data)
                    {
                        //console.log("trying to fetch a list of colleges");
                        //console.log(res);
                        $scope.courses=getCourses(res.data);
                        //console.log("colleges list:");
                        //console.log($scope.coll);
                    }
                    else
                    {
                        $scope.output="No response"
                    }
                },
                function(res)
                {
                    console.log("getting college name failed");
                }
            );      



            $scope.name="Gender Distribution";
            $scope.tableheader=['Gender','Number of Students'];
            $scope.data=[];
            $scope.table_heading="Gender Distribution of students enrolled in the various courses";

            $scope.try=function(item)
            {
                alert(item);
            }

            $scope.update_things=function(ip_course)
            {
                $scope.bow=ip_course;
                $http({
                    method: 'POST',
                    url: 'http://localhost:8080/getCourseGenderDistribution',
                    data:"ip_course="+ip_course, 
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(
                    function(res)
                    {
                        console.log("successfully fetched the data");
                        if(res.data)
                        {
                            var k=res.data;
                            preprocess_report1(res.data,'pie');
                            for(var i=0;i<k.length;i++)
                            {
                                var temp=[];
                                var m=0;
                                for(var j in k[i])
                                {
                                    temp[m]=k[i][j];
                                    m++;
                                }
                                $scope.data[i]=temp;
                            }
                            console.log("scope data\n");
                            console.log($scope.data);
                        }
                        else
                        {
                            $scope.output="No response"
                        }
                    },
                    function(res)
                    {
                        console.log("failed");
                    }
                );
            }
        }
);


function preprocess_report1(res,graph)
{
    console.log("preprocess called");
    console.log("response here is ");
    console.log(res);
    var labels_temp=[];
    var data_temp=[];
    var bg_temp=[];
    var hvr_temp=[];
    
    for(var i=0;i<res.length;i++)
    {
        labels_temp[i]=res[i].gender;
        data_temp[i]=res[i].ct;
        var col=randomColourGen();
        bg_temp[i]=col[0];
        hvr_temp[i]=col[1];
    }

    var data={
        labels:labels_temp,
        datasets:[
            {
                data:data_temp,
                backgroundColor:bg_temp,
                hoverBackgroundColor:hvr_temp,
            },
        ]
    };
    var options={
        responsive:true,
        legend:{
            display:true,
            position:'left'
        },
        title:{
            display:true,
            text:'Gender Distribution',
            fontSize:36
        }
    };
    console.log(labels_temp);
    console.log(data);
    draw_chart(data,options,graph);
}

// ----------------------------------------------------------controller report 2-------------------------------------------------------------------
angular.module('playerApp')
  .controller('ReportController2',
  function($scope,$http)
  {
    $scope.show_graph=true;
    $scope.show_table=true;
    $scope.show=true;
    $scope.name="Area Distribution";
    $scope.tableheader=["Location","Number Of students"];
    $scope.data=[];
    $http({
        method: 'POST',
        url: 'http://localhost:8080/getCourses',
        data:"id=96821",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(
        function(res)
        {
            console.log("successfully got college data");
            if(res.data)
            {
                $scope.courses=getCourses(res.data);
            }
            else
            {
                $scope.output="No response"
            }
        },
        function(res)
        {
            console.log("getting college name failed");
        }
    );

    $scope.update_things=function(ip_course)
    {
        $scope.bow=ip_course;
        $http({
            method: 'POST',
            url: 'http://localhost:8080/getCourseAreaDistribution',
            data:"ip_course="+ip_course,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(res)
            {
                console.log("success");
                if(res.data)
                {
                    var k=res.data;
                    preprocess_report2(res.data,'bar');
    
    
                    for(var i=0;i<k.length;i++)
                    {
                        //console.log(i+" "+k[i]);
                        var temp=[];
                        var m=0;
                        for(var j in k[i])
                        {
                            temp[m]=k[i][j];
                            m++;
                        }
                        $scope.data[i]=temp;
                    }
    
                }
                else
                {
                    $scope.output="No response"
                }
            },
            function(res)
            {
                console.log("failed");
            }
        );

    }


  }
);



function preprocess_report2(res,graph)
{
    var labels_temp=[];
    var data_temp=[];
    var bg_temp=[];
    var hvr_temp=[];
    
    for(var i=0;i<res.length;i++)
    {
        labels_temp[i]=res[i].location;
        data_temp[i]=res[i].ct;
        var col=randomColourGen();
        bg_temp[i]=col[0];
        hvr_temp[i]=col[1];
    }
    var data={
        labels:labels_temp,
        datasets:[
            {
                data:data_temp,
                backgroundColor:bg_temp,
                borderColor:hvr_temp,
            },
        ]
    };
    var options={
        responsive:true,
        title:{
            display:true,
            text:'Region Wise Distribution',
            fontSize:36
        },scales:{
            yAxes:[{scaleLabel:{display:true,labelString:"No of students"},ticks:{beginAtZero:true}}],
            xAxes:[{scaleLabel:{display:true,labelString:"Regions"}}]
        }
    };
    console.log(labels_temp);
    console.log(data);
    draw_chart(data,options,graph);
}




//-----------------------------------------------report controller 3------------------------------------------------------

angular.module('playerApp')
  .controller('ReportController3',
  function($scope,$http)
  {
    $scope.show_graph=true;
    $scope.show_table=true;
    $scope.show=true;
    $scope.name="report 3";
    $scope.table_heading="Education Levels of various students";
    $scope.name="Education levels";
    $scope.tableheader=['Education Level','Number of Students'];
    $scope.data=[];

    // fetch list of courses
    $http({
        method: 'POST',
        url: 'http://localhost:8080/getCourses',
        data:"id=96821",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(
        function(res)
        {
            console.log("successfully got college data");
            if(res.data)
            {
                $scope.courses=getCourses(res.data);
            }
            else
            {
                $scope.output="No response"
            }
        },
        function(res)
        {
            console.log("getting college name failed");
        }
    );

    $scope.update_things=function(ip_course)
    {
        $scope.bow=ip_course;
        $http({
            method: 'POST',
            url: 'http://localhost:8080/getCourseEducationDistribution',
            data:"ip_course="+ip_course,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(res)
            {
                console.log("success");
                if(res.data)
                {
                    var k=res.data;
                    preprocess_report3(res.data,'bar');
    
    
                    for(var i=0;i<k.length;i++)
                    {
                        //console.log(i+" "+k[i]);
                        var temp=[];
                        var m=0;
                        for(var j in k[i])
                        {
                            temp[m]=k[i][j];
                            m++;
                        }
                        $scope.data[i]=temp;
                    }
                }
                else
                {
                    $scope.output="No response"
                }
            },
            function(res)
            {
                console.log("failed");
            }
        );

    }
  }
);


function preprocess_report3(res,graph)
{
    var labels_temp=[];
    var data_temp=[];
    var bg_temp=[];
    var hvr_temp=[];
    
    for(var i=0;i<res.length;i++)
    {
        labels_temp[i]=res[i].education;
        data_temp[i]=res[i].ct;
        var col=randomColourGen();
        bg_temp[i]=col[0];
        hvr_temp[i]=col[1];
    }
    var data={
        labels:labels_temp,
        datasets:[
            {
                data:data_temp,
                backgroundColor:bg_temp,
                borderColor:hvr_temp,
            },
        ]
    };
    var options={
        responsive:true,
        title:{
            display:true,
            text:'Education Levels',
            fontSize:36
        },scales:{
            yAxes:[{scaleLabel:{display:true,labelString:"No of students"}}],
            xAxes:[{scaleLabel:{display:true,labelString:"Education"}}]
        }
    };
    console.log(labels_temp);
    console.log(data);
    draw_chart(data,options,graph);
}

// ----------------------------------------------------report controller 5--------------------------------------------------------------------------

// useless
angular.module('playerApp')
  .controller('ReportController5',function($scope,$http)
  {
    $scope.show_graph=true;
    $scope.show_table=true;
      $scope.show=false;
      $scope.name="List of Organization";
      $scope.tableheader=['Name','Id'];
      $scope.data=[];
      $scope.table_heading="List of Organization";
      
      $http(
          {
              method:"GET",
              url: "http://localhost:8080/user_auth",
      })
      .then(
          function(res){
              console.log("user authentication successful");
              $scope.user_auth=res.data;

              $http({
                method:'GET',
                url: 'https://staging.open-sunbird.org/api/org/v1/type/list',
                headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyYTgzYWY1MGExNWU0M2QwOTFiNTJlNjhiMjEwMTdmYyJ9.UOEJGiA9PRoK5f1xaQUUX_gUfzxF0GfNRYELwogO8OY",
                            "Content-Type": "application/json",
                            "X-Authenticated-User-Token":$scope.user_auth
                        }
            }).then(
                function(res)
                {
                    $scope.bow="Got Them";
                    console.log("successfully got the list");
                    console.log(res.data.result.response);
                    var k=res.data.result.response;
                    for(var i=0;i<k.length;i++)
                    {
                        var temp=[];
                        var m=0;
                        for(var j in k[i])
                        {
                            temp[m]=k[i][j];
                            m++;
                        }
                        $scope.data[i]=temp;
                    }
                    console.log("scope data\n");
                    console.log($scope.data);
                },
                function(err)
                {
                    console.log("Failed");
                    console.log(err);
                }
            );
          },
          function(err){
              //console.log("user authentication failed");
              console.log(err);
          }
        );
      
  });

// ----------------------------------------------------report controller 1----------------------------------------------------

angular.module('playerApp')
  .controller('ReportController',function($scope,$http)
  {

        //$scope.showContent=true;
        $scope.show=true;
        $scope.name="Content Consumption";
        $scope.tableheader=["Time","Consumption Frequency"];
        $scope.data=[];
        $scope.table_heading="Content Consumption over a period of year";

        $http({
            method: 'POST',
            url: 'http://localhost:8080/getCourses',
            data:"id=96821",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(res)
            {
                console.log("successfully got college data");
                if(res.data)
                {
                    $scope.courses=getCourses(res.data);
                }
                else
                {
                    $scope.output="No response"
                }
            },
            function(res)
            {
                console.log("getting college name failed");
            }
        );
    
        $scope.update_things=function(ip_course)
        {
            $scope.bow=ip_course;
            $http(
                {
                method: 'POST',
                url: 'http://localhost:8080/fetch',
                data:"query=SELECT * FROM contents WHERE courseId=(SELECT courseId FROM courses WHERE courseName='"+ip_course+"')",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }
            ).
            then(
                function(res){
                    console.log("got the course contents");
                    //console.log(res.data);
                    console.log(res.data);
                    if(res.data.length!=0)
                    {
                        $scope.show_graph=true;
                        $scope.show_table=true;
                        $scope.showContent=true;
                    }
                    else
                    {
                        console.log("still no change");
                        $scope.show_graph=false;
                        $scope.show_table=false;
                        $scope.showContent=false;
                        $scope.content=null;
                    }
                    $scope.contents=getContent(res.data);
                }   
                ,
                function(err){
                    console.log("failed to get the ")

                }
            );
        }
        $scope.contentConsume=function(item)
        {
            console.log("In contentConsumption and the course");
            var k;
            $http({
                method: 'POST',
                url: 'http://localhost:8080/getContentConsumption',
                data:"contentid="+globalIdvar[item],
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}                    
            }
            ).then(
                function(res)
                {
                    console.log("got the count");
                    console.log(res.data);
                    preprocess_report5(res.data,'line')
                    
                    var k=res.data;
                    for(var i=0;i<k.length;i++)
                    {
                        //console.log(i+" "+k[i]);
                        var temp=[];
                        temp[0]=getMonthName(k[i]["m"])+" "+k[i]["y"];
                        temp[1]=k[i]["ct"];
                        $scope.data[i]=temp;
                    console.log("data has");
                    console.log($scope.data);
 
                
                }
            },
                function(error){
                    console.log("failed to get the counsuption data");
                }
            );
            $scope.content=item;

        }

  }
);




function preprocess_report5(res,graph)
{
    var labels_temp=[];
    var data_temp=[];
    var bg_temp=[];
    var hvr_temp=[];
    
    for(var i=0;i<res.length;i++)
    {
        labels_temp[i]=getMonthName(res[i].m)+" "+res[i].y;
        data_temp[i]=res[i].ct;
        var col=randomColourGen();
        bg_temp[i]=col[0];
        hvr_temp[i]=col[1];
    }
    var data={
        labels:labels_temp,
        datasets:[
            {
                data:data_temp,
                pointBackgroundColor:bg_temp,
                pointBorderColor:hvr_temp
                // ,backgroundColor:'rgb(190, 225, 244)'
            },
        ]
    };
    var options={
        responsive:true,
        title:{
            display:true,
            text:'Consumption Frequency',
            fontSize:24,
            fontFamily:"Tahoma"
        },scales:{
            yAxes:[{scaleLabel:{display:true,labelString:"Frequency",fontFamily:"Verdana"}}],
            xAxes:[{scaleLabel:{display:true,labelString:"Time",fontFamily:"Verdana"}}]
        },
    };
    console.log(labels_temp);
    console.log(data);
    draw_chart(data,options,graph);
}






var globalIdvar={};
function getContent(res)
{
    var listCont=[];
    for(var x in res){
        listCont[x]=res[x]['contentName'];
        globalIdvar[res[x]['contentName']]=res[x]['contentId'];
    }
    console.log("return from the getcntent");
    console.log(listCont);
    return listCont;
}

function getMonthName(item)
{
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[item-1];

}
//   -------------------------------------------------------utilities----------------------------------------------------------
/*selects the courses name from the response*/
function getCourses(res)
{
    var listCourses=[];
    for(var x in res){
        listCourses[x]=res[x]['courseName'];
    }
    console.log("return from the gc");
    console.log(listCourses);
    return listCourses;
}

// selects the colleges form the response
function getColleges(res)
{
    var listColleges=[];
    for(var x in res){
        listColleges[x]=res[x]['orgName'];
    }
    console.log("return from the gc");
    console.log(listColleges);
    return listColleges;
}


// this function is used to generate the random colours one light, one dark 
function randomColourGen()
{
    var colour = 'rgb(' + (Math.floor(Math.random() * 256)) +
     ',' + (Math.floor(Math.random() * 256)) +
      ',' + (Math.floor(Math.random() * 256)) + 
      ',';
      var bright=colour+'1.0)';
      var light=colour+'0.7)';
      return [light,bright];
}

// end

function draw_chart(dataIp,optionsIp,typeOfGraph)
{
    console.log("Type of the graph:"+typeOfGraph);
    var ctxP=document.getElementById("chart_container").getContext("2d");
    var charts= new Chart(ctxP,{
        type:typeOfGraph,
        title:"sex distribution",
        data:dataIp,
        options:optionsIp
    });
}














