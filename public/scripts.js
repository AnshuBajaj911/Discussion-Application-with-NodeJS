
    var obj = [];
    var tind;
    function f3() {

        var t = document.getElementById("na").value;
        var t2 = document.getElementById("tv").value;
        obj[tind][t] = t2;    
        localStorage.setItem("n", JSON.stringify(obj));
            var zz = document.createElement("div");
        zz.style.border = "1px solid rgb(180, 179, 179)";
        zz.style.backgroundColor = "rgb(236, 232, 232)";

        var yy = document.createElement("h2");
        yy.innerHTML = t;
        var yy2 = document.createElement("h3");
        yy2.innerHTML = t2;
        yy.appendChild(yy2);
        zz.appendChild(yy);
        document.getElementById("form3").appendChild(zz);
         var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            
          }
        };
        xhttp.open("POST", "/add", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        arr=localStorage.getItem("n");
       // xhttp.setHeader('obj',arr);
        xhttp.send('obj='+arr);
    }


    function f2(index) {
        document.getElementById("qq").innerHTML = obj[index].title;
        document.getElementById("qq2").innerHTML = obj[index].text;        
        document.getElementById("form3").innerHTML = "";
        document.getElementById("form1").style.display = "none";
        document.getElementById("form2").style.display = "block";
        document.getElementById("form3").style.display = "block";
        tind = index;
        var test2 = Object.keys(obj[tind]);
        var test3 = Object.values(obj[tind]);

        for (i in test2) {
            if (test2[i] != "title" && test2[i] != "text") {
                var yy = document.createElement("h2");
                yy.innerHTML = test2[i];

                var yy2 = document.createElement("h3");
                yy2.innerHTML = test3[i];
                yy.appendChild(yy2);
                document.getElementById("form3").appendChild(yy);
            }
        }

    }
    var xhttp = new XMLHttpRequest();
    function ff() {
        // console.log(localStorage.getItem("n")=='[]');
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                var temp = this.responseText;
                temp = JSON.parse(temp);
                console.log(temp);
                localStorage.setItem("n", JSON.stringify(temp));
            }
        };
        xhttp.open("GET", "/getData", true);
        xhttp.send();
        let notes = localStorage.getItem("n");
        //alert(obj);.
        if (notes == null) {
            obj = [];
            //document.getElementById("leftSide").innerHTML="";
        }
        else {
            obj = JSON.parse(notes);
            //alert(obj);
        }
        let html = "";

        obj.forEach(function (element, index) {
            html += `<div id="${index}" class="cc uq" onclick="f2(this.id)"><h2>${element.title}</h2><p>${element.text}</p><label style="display:none;"></label></div>`
            document.getElementById("leftSide").innerHTML = html;
        });
    }


    function f() {

        let notes = localStorage.getItem("n");

        let s = document.getElementById("sub").value;
        v = document.getElementById("w").value;
        if (s == "" || v == "") alert("Input Fields Can't be Empty");
        else {

            if (notes == null) {
                obj = [];
            }
            else {
                obj = JSON.parse(notes);
                //alert(obj);
            }

            o1 = { title: s, text: v };
            obj.push(o1);
            //obj[1].rajma="Chawal";
            localStorage.setItem("n", JSON.stringify(obj));
            console.log(localStorage);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                
              }
            };
            xhttp.open("POST", "/add", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            arr=localStorage.getItem("n");
           // xhttp.setHeader('obj',arr);
            xhttp.send('obj='+arr);

            ff();



            console.log(obj);
        }
    }


    function f0() {
        if (localStorage.getItem("n") == "[]") {
            // alert("ascdac");
            document.getElementById("leftSide").innerHTML = "";
        }
        document.getElementById("sub").value = '';
        document.getElementById("w").value = '';
        document.getElementById("form1").style.display = "block";
        document.getElementById("form2").style.display = "none";
        document.getElementById("form3").style.display = "none";
    }

    function dell() {
       
  
        console.log("I'm deleting index " + tind);

        let notes = localStorage.getItem("n");

        // console.log(localStorage.getItem("n"));
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }

        notesObj.splice(tind, 1);

        localStorage.setItem("n", JSON.stringify(notesObj));
        console.log(localStorage);

        //showNotes();.
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            
          }
        };
        xhttp.open("POST", "/add", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        arr=localStorage.getItem("n");
       // xhttp.setHeader('obj',arr);
        xhttp.send('obj='+arr);
        ff();
        f0();
    }

    let search = document.getElementById('searchtxt');
    search.addEventListener("input", function () {
        console.log('input fired');
        let inputVal = search.value.toLowerCase();
        let noteCards = document.getElementsByClassName('uq');
        Array.from(noteCards).forEach(function (element) {

            let cardTitle = element.getElementsByTagName("h2")[0].innerText;
            
            var str = cardTitle;
            str = str.toLowerCase();
            
            if (str.includes(inputVal)) {
                element.style.display = "block";
            }
            else {
                element.style.display = "none";
            }
        });
    });
