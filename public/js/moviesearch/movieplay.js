$(function() {


    var colorRed = "rgb(165, 42, 42)";
    var colorBlue = "rgb(42, 50, 165)";
    var colorGray = "#444444";


    //開幕実行
    var dataContents = localStorage["dataContents"];
    var sort_view_count = localStorage["sort_view_count"];
    var sort_published_at = localStorage["sort_published_at"];
    var filter_bool_vc = localStorage["filter_bool_vc"];
    var filter_string_guide = localStorage["filter_string_guide"];
    var filter_bool_clear = localStorage["filter_bool_clear"];
    var filter_bool_act = localStorage["filter_bool_act"];
    var filter_language = localStorage["filter_language"];
    var filter_play_job_json = localStorage["filter_play_job"];
    var filter_play_job = JSON.parse(filter_play_job_json);

    AjaxFilterList();




    //非同期処理
    function AjaxFilterList()
    {
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },//Headersを書き忘れるとエラーになる
            url: '/moviesearch/moviesearchajax',
            type: 'post',
            dataType: "json",
            data: {
                dataContents:dataContents,
                sort_view_count:sort_view_count,
                sort_published_at:sort_published_at,
                filter_bool_vc:filter_bool_vc,
                filter_bool_act:filter_bool_act,
                filter_play_job:filter_play_job,
                filter_string_guide:filter_string_guide,
                filter_bool_clear:filter_bool_clear,
                filter_language:filter_language,
              },
        })
        // Ajaxリクエスト成功時の処理
        .done(function(data) {
            // Laravel内で処理された結果がdataに入って返ってくる
           makeMovieList(data);

        })
        // Ajaxリクエスト失敗時の処理
        .fail(function(data) {
            alert('Ajaxリクエスト失敗');
        });
    }


    function makeMovieList(datas)
    {
        var index = 1;

        datas.forEach(data => {    
        
        //コンテンツ生成
        $('.searchlist_contents').last().append('<a href="/moviesearch/'+data["movie_id"]+'/">');
        $('.searchlist_contents a').last().append('<div class="searchlist_contents_one">');
        
        $('.searchlist_contents_one').last().append('<div class="searchlist_contents_index">'+index+'</div>');
        $('.searchlist_contents_one').last().append('<div class="searchlist_contents_samenil">');
        $('.searchlist_contents_one').last().append('<div class="searchlist_contents_detail">');

        $('.searchlist_contents_detail').last().append('<div class="searchlist_contents_title">');
        $('.searchlist_contents_detail').last().append('<div class="searchlist_contents_channelname">');
        $('.searchlist_contents_detail').last().append('<div class="searchlist_contents_view_count">');

        $('.searchlist_contents_samenil').last().append('<img src='+data["samneil_img"]+' alt="">');

        $(".searchlist_contents_title").last().text(data["movie_title"]);
        $(".searchlist_contents_channelname").last().text(data["channel_name"]);
        $(".searchlist_contents_view_count").last().text(data["view_count_str"]+"・"+data["published_at_str"]);


        //再生中のものにチェックを入れる
        var nowUrl = $(location).attr('href');

        if(nowUrl.indexOf(data["movie_id"])>0)
        {
            $(".searchlist_contents_index").last().text("●");
            $(".searchlist_contents_index").last().css("color","red")
        }


        index++;
        });
    }



    //★マーククリックメイン
    $(document).on("click",".movie_list_favorite",function(){        

        favorite_movie_json = localStorage["favorite_movie"];

        if(favorite_movie_json == null){
            favorite_movie_array = ["NONE"];
        }else{
            favorite_movie_array = JSON.parse(favorite_movie_json);
        }

        //off
        if($(this).css("background-color") == "rgb(68, 68, 68)")
        {
            $(this).css("color","rgb(255, 255, 255)");
            $(this).css("background-color","rgb(165, 42, 42)");
            $(this).text("お気に入りに登録");

            var removals = [$(this).attr("data-id")];
            favorite_movie_array = favorite_movie_array.filter(function(v){
              return ! removals.includes(v);
            });



        //on
        }else{
            $(this).css("color","rgb(255, 255, 255)");
            $(this).css("background-color","rgb(68, 68, 68)");
            $(this).text("登録済み");

            //バグ防止のため存在を確認
            if($.inArray($(this).attr("data-id"), favorite_movie_array)<0){
                favorite_movie_array.push($(this).attr("data-id"));
            };


        }

        //ストレージに保存
        favorite_movie_array.sort();
        favorite_movie_json = JSON.stringify(favorite_movie_array, undefined, 1);
        localStorage["favorite_movie"] =  favorite_movie_json;

    });


    //★マーククリックチャンネルリスト
    $(document).on("click",".movie_list_favoritestar",function(){        

        favorite_movie_json = localStorage["favorite_movie"];

        if(favorite_movie_json == null){
            favorite_movie_array = ["NONE"];
        }else{
            favorite_movie_array = JSON.parse(favorite_movie_json);
        }

        //off
        if($(this).css("color") == "rgb(251, 255, 0)")
        {
            $(this).css("color","rgb(107, 107, 107)");

            var removals = [$(this).attr("data-id")];
            favorite_movie_array = favorite_movie_array.filter(function(v){
              return ! removals.includes(v);
            });

            $("#pop").text("★解除しました。");
            $("#pop").css("background-color",colorBlue);

        //on
        }else{
            $(this).css("color","rgb(251, 255, 0)");

            //バグ防止のため存在を確認
            if($.inArray($(this).attr("data-id"), favorite_movie_array)<0){
                favorite_movie_array.push($(this).attr("data-id"));
            };
            
            $("#pop").text("★追加しました！");
            $("#pop").css("background-color",colorRed);
        }

        //ストレージに保存
        favorite_movie_array.sort();
        favorite_movie_json = JSON.stringify(favorite_movie_array, undefined, 1);
        localStorage["favorite_movie"] =  favorite_movie_json;

    });




    //★hoverポップ
    $(document).on("mouseenter", ".movie_list_favoritestar", function (eo) {
        var text = '<div id="pop">★お気に入りに追加します</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", ".movie_list_favoritestar", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});


    //お気に入り登録ポップ
    $(document).on("mouseenter", ".movie_list_favorite", function (eo) {
        var text = '<div id="pop">★お気に入りに追加します</div>';
        MouseHoverText(eo,text);
    });
    $(document).on("mouseleave", ".movie_list_favorite", function (eo) {$('#pop').remove();$('#pop').remove();$('#pop').remove();});


    //ポップアクション　関数
    function MouseHoverText(eo,text){
        $('body').append(text);
        $('#pop').show();
        $(window).mousemove( function(e){
            var x = e.pageX;
            var y = e.pageY-40;
            $('#pop').css({left:x+'px',top:y+'px','z-index':'100'});
        });
    }



    

    //★を黄色くする
    function StarMarking(){
        favorite_movie = localStorage["favorite_movie"];
        favorite_movie = JSON.parse(favorite_movie);

        favorite_movie.forEach(movie_id => {

            $('.movie_list_favorite[data-id="'+movie_id+'"]').css("color","rgb(255, 255, 255)");
            $('.movie_list_favorite[data-id="'+movie_id+'"]').css("background-color","rgb(68, 68, 68)");
            $('.movie_list_favorite[data-id="'+movie_id+'"]').text("登録済み");


            $('.movie_list_favoritestar[data-id="'+movie_id+'"]').css("color","rgb(251, 255, 0)");
            $('.movie_list_favoritestar[data-id="'+movie_id+'"]').text("★");
        });    
    }



    //読み込み時実行
    //favorite_movie ストレージの内容は星に色を
        StarMarking();

















});