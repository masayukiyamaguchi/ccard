<!DOCTYPE html>
<html lang="jp">

<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="stylesheet" href="/css/moviesearch/movieplay.css">
    <link rel="stylesheet" href="/css/mainTopHeader.css">
    <link rel="stylesheet" href="/css/mainTopFooter.css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="/js/moviesearch/movieplay.js"></script>



    <title>FF14-APP|FinalFantasyXIVのアプリサイト</title>

</head>

<body id="body">

    <!--共通ヘッダー-->
    @component('components.commonHeaderMenu')
    @endcomponent

    <div id="mainContents">
        <div class="backgroundimage">
            <div class="mainContents_container">
                
                <!-- レフト　-->
                <div class="mainContents_container_left">

                    <div class="mainContents_container_left_contents">
                        
                        <div  class="main_movie_iflame_wrap">
                        <div class="main_movie_iflame">
                            <iframe 
                                width="1280" 
                                height="720" 
                                src="https://www.youtube.com/embed/{{ $id }}?autoplay=1"
                                title="YouTube video player" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                        </div>

                        <div class="main_movie_detail">

                            <div class="main_movie_detail_title">
                                {{ $all["movie_title"] }}
                            </div>

                            <div class="main_movie_detail_view_count">
                                {{ $all["view_count_numformat"] }} 回視聴・{{ $all["published_at_str"] }}
                            </div>

                            <div class="main_movie_detail_channelinfo">

                                <div class="main_movie_detail_channelinfo_channelicon">
                                    <img src="{{ $all["channel_img"] }}" alt="">
                                </div>

                                <div class="main_movie_detail_channelinfo_text">
                                    <a href="/moviesearch/channnel/{{ $all["channel_id"] }}">
                                        <div class="main_movie_detail_channelinfo_text_channelname">
                                            {{ $all["channel_name"] }}
                                        </div>
                                    </a>
                                    <div class="main_movie_detail_channelinfo_member_num">
                                        チャンネル登録者数 {{ $all["member_num_str"] }}
                                    </div>
    
                                    <div class="main_movie_detail_channelinfo_text_moviediscription">
                                        {!! nl2br(e($all["movie_discription"])) !!}
                                    </div>
                                </div>

                            </div>

                        </div>


                    </div>
               

                </div>
                


                <!-- センター　-->
                <div class="mainContents_container_center">

                    <div class="searchlist">

                        <div class="searchlist_contents">

                            
                            <!--
                            <a href="">
                            <div class="searchlist_contents_one">

                                <div class="searchlist_contents_index">1</div>

                                <div class="searchlist_contents_samenil">
                                    <img src="https://i.ytimg.com/vi/26mK2wk1TKs/maxresdefault.jpg" alt="">
                                </div>
    
                                <div class="searchlist_contents_detail">
                                   
                                    <div class="searchlist_contents_title">
                                        金ネジキクリアまでの軌跡金ネジキクリアまでの軌跡金ネジキクリアまでの軌跡金ネジキクリアまでの軌跡金ネジキクリアまでの軌跡金ネジキクリアまでの軌跡
                                    </div>
                                    <div class="searchlist_contents_channelname">
                                        チャンネル名
                                    </div>
                                    <div class="searchlist_contents_view_count">
                                        再生回数・公開日
                                    </div>
                                    
                                </div>


                            </div>
                            </a>

                            -->



                        </div>

                    </div>

                </div>



            </div>
        </div>
    </div>

    <!--共通フッター-->
    @component('components.commonFooterMenu')
    @endcomponent
    

</body>
</html>