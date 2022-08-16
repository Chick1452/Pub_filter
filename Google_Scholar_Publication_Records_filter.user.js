// ==UserScript==
// @name         Google_Scholar_Publication_Records_filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to offer one more clear publication analysis for one specific scholar!
// @author       NinijiZ
// @match        https://scholar.google.com/citations*user=*
// @exclude      https://scholar.google.com/citations*view_citation*user=*
// @icon         none
// @grant        GM_xmlhttpRequest
// ==/UserScript==


(function() {
    'use strict';
    //filter();
    //shorten_name();
    var user_id;
    var record_id;
    var href="/citations?view_op=view_citation&hl=en&user="+user_id+"&citation_for_view="+user_id+"J:"+record_id;
    //get_href(href);
    //add_button();
    add_table();

})();

function Renew() {
    var time_count = setInterval(function() {
        var before_renew_page = document.body.scrollHeight;
        let show_more_button = document.getElementById('gsc_bpf_more');
        if (show_more_button.disabled == false) {
            show_more_button.click();
            //alert('?'+show_more_button.textContent);
            //alert('?'+document.readyState);
            //console.log(document.readyState);
            console.log(document.body.scrollHeight);
            //document.write(show_more_button.textContent);
            //return true;
            console.log("Renew this page for more records!");
        } else {
            //return false;
            //setTimeout(function(){},10000)
            console.log("Network failed OR Page down to maximum");
            //console.log("Page loading!");
        }
        if (document.body.scrollHeight == before_renew_page) {
                //console.log(before_renew_page + "PAGE Length before");
                console.log(document.body.scrollHeight + ":FULL PAGE Length");
                clearInterval(time_count);
                alert('All Records Sucessfully Loaded!');
        }
        else{
        console.log("Page loading!");
        }
    },
    3000);

}


function filter(){
//This code removes those records whose very first or last author mismatches this scholar.
//Temperally, this code only judge from name. e.g., Matt Smith ==> M Smith/M. Smith
    var list_divs = document.getElementsByClassName('gsc_a_tr');
    //console.log(list_divs);
    var i_paper;
    var page_owner_name = document.getElementById('gsc_prf_in').textContent; //Unless this sholar messed his/her name in purpose.
    console.log(page_owner_name)
    var array_authors = [];
    for (i_paper = 0; i_paper < list_divs.length; i_paper++) {
        var authors_per_record = list_divs[i_paper].getElementsByClassName('gs_gray')[0].textContent.split(", ");
        console.log(authors_per_record);
        if (authors_per_record.includes("...")){
            console.log("Href needed check");}
        //console.log(temp_array_author.textContent.split(", "));
        //console.log(temp_array_author);
        array_authors = array_authors.concat(authors_per_record);
    };
    console.log(array_authors);
    console.log('heresd');
    console.log(check_name_rate(array_authors));

}

function check_name_rate(authors_list){
    var a = [];
    let b = {};
    var max = 1;
    for (var i=0;i<authors_list.length;i++){
        if (a.includes(i)==false){ //Counted name
            var match_num = 1;
        for (var h = i+1;h<authors_list.length;h++){
            if (authors_list[i]==authors_list[h]){
                match_num++;
                a = a.concat(h);
            }}

        //console.log(b);
        //console.log(authors_list[i]+match_num);
         if (match_num>max){
             max = match_num;
             var max_name = authors_list[i]}

        //var position = authors_list.indexOf(authors_list[i]);
        if (b.hasOwnProperty(authors_list[i])==false){
        var name = authors_list[i];
        var count = match_num;
        b[name]=count;
        }
        }
    }
    console.log(b);
    return (max_name);
}

function add_button(){
    var but = document.createElement('button');
    but.innerHTML = "启动";
    but.style.color = "blue";//document.getElementsById("gsc_hist_opn").style.color;
    but.style.left="10px";

    but.addEventListener("click",alert_none);
    //var right_panel = document.getElementsByClassName("gsc_rsb");
    //right_panel[0].appendChild(but);
    var right_panel = document.getElementById("gsc_rsb_cit");

    console.log(right_panel);
    //console.log(right_1);
    //right_panel.insertBefore(but,right_1);
    right_panel.append(but);
}


function add_table(){
    var but = document.createElement('div');
    but.innerHTML = "<div id = 'added_table'></div>";
    //but.style.color = "blue";
    //but.style.left="10px";

    //but.addEventListener("click",alert_none);
    //var right_panel = document.getElementsByClassName("gsc_rsb");
    //right_panel[0].appendChild(but);

    var right_panel = document.getElementById("gsc_rsb_cit");

    console.log(right_panel);
    //console.log(right_1);
    //right_panel.insertBefore(but,right_1);
    right_panel.append(but);

    var div = document.getElementById("added_table");
    var table = document.createElement("table");
    var t_body = document.createElement("tbody");
    var tr_1 =document.createElement("tr");
    var td_11 = document.createElement("td");
    var td_11_c = document.createTextNode("Sure to get all records?");
    tr_1.style.color= '#FF5733';
    var td_12_c = document.createElement('button');
        td_12_c.innerHTML = "启动";
        td_12_c.style.color = "blue";
    td_12_c.style.backgroundColor ='#FFFFFF';
        //td_12_c.style.left="10px";
    td_12_c.style.border = '0px';//solid blue';
    td_12_c.addEventListener("click",Renew);
    tr_1.appendChild(td_11_c);
    tr_1.appendChild(td_12_c);
//add more rows!

    t_body.appendChild(tr_1);
    //var br = document.createElement("li");
    //br.innerText="sddsdsdsd";
    //console.log(br);
    //div.append(br);}
    table.append(t_body);
    div.append(table);
}

function alert_none(){
console.log("heloo");
}
function remove_none_match(){
// Removes thoes matches the condition: neither of first author or last author.

}

function highlight_record(){
// Change the BG for specific record.
}

function shorten_name(author_name, real_name){
    //author_name = "Z Chen";
    //var real_name = "Zhongwei Chen";
    author_name = author_name.toLowerCase();
    real_name = real_name.toLowerCase();
    console.log(author_name);
    console.log(real_name);
    let author_name_array = author_name.split(' ');
    let real_name_array = real_name.split(' ');
    console.log(author_name_array);
    console.log(real_name_array);
    console.log(author_name_array[0].charAt(0));
    console.log(author_name_array[1].charAt(0));
    console.log(real_name_array[0].charAt(0));
    console.log(real_name_array[1].charAt(0));
    if(real_name.includes(author_name_array[1])){
    console.log("matched!");
        var Last_name = author_name_array[1];
    }
}
function get_href(href){
    try {
    var current_user_agent = navigator.userAgent;
    console.log(current_user_agent);
    var refer_url = window.location.href;
    console.log(refer_url);
    refer_url = "https://scholar.google.com/citations?user=zpOpswMAAAAJ&hl=en&oi=ao";
    var current_host = window.location.host;
    var xhr = new XMLHttpRequest()
        xhr.open('get', href)
        xhr.send()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //console.log(xhr.responseText);

                //document.getElementById("gsc_oci_value").innerHTML=xhr.responseText;
                var el = document.createElement('html');
                el.innerHTML = xhr.responseText;

                var authors = el.getElementsByClassName("gsc_oci_value")[0].textContent;
                console.log(authors);
            }
        }
    } catch(error){
        console.log(error);
        return false;}
}