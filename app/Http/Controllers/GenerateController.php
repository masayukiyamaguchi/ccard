<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use XIVAPI\XIVAPI;
use App\Seachdata;
use Image;

class GenerateController extends Controller
{
    public function index(Request $request){

        $loadstone_id = $_POST["loadstone_id"];

        if($loadstone_id==""){
            return view("index",["error"=>"Lodestone IDを入れてください"]);
        }

        // API利用の宣言
        $api = new \XIVAPI\XIVAPI();

        // データの抽出
        $seachdata = new Seachdata;
        $seach_datas = $seachdata->searchdata($loadstone_id);

        // ロドストIDが不正だった場合
        if($seach_datas=="error"){
            return view("index",["error"=>"Lodestone IDが不正です"]);
        }        

         // キャラ名
        $char_name = $seach_datas->Character->Name;

        // サーバー
        $char_server = $seach_datas->Character->Server;

        // ワールド
        $char_world = $seachdata->searchworld($char_server);

        // 種族
        $char_race = $seachdata->searchrace($seach_datas->Character->Race);

        // 部族
        $char_tribe = $seachdata->searchtribe($seach_datas->Character->Tribe);
        
        // 性別
        $char_gender = $seachdata->searchgender($seach_datas->Character->Gender);

        // フリーカンパニー
        $char_freecompany = $seach_datas->Character->FreeCompanyName;


        // 画像
        $file_name = $_FILES['file_upload']['name'];

        if($file_name==""){
            return view("index",["error"=>"スクショを選択してください"]);
        }

        $file_type = $_FILES['file_upload']['type'];

        $file_tmp_name = $_FILES['file_upload']['tmp_name'];
        // 画像タイプかどうか判別
        if(exif_imagetype($file_tmp_name)){
            // dump("success");
        }else{
            return view("index",["error"=>"画像ファイルを選択してください"]);
        }
        
        $file_error = $_FILES['file_upload']['error'];

        // 保存場所、ファイル名の正規化
        $save_dir = 'img/'.basename($file_name);

        // 画像ファイルのアップロード
        if(move_uploaded_file($file_tmp_name,$save_dir)){
            // dump("success");
        }else{
            return view("index",["error"=>"アップロード失敗:".$file_error]);
        }


        // 画像のクリエイトテスト

        $url = "img/test.png";
        $img = \Image::make($url);

        // $img->flip();

        // $save_path = "img/test2.png";
        // $img->save($save_path,100);


        return view("generate",
            [
                "char_name"=>$char_name,
                "char_server"=>$char_server,
                "char_world"=>$char_world,
                "char_race"=>$char_race,
                "char_tribe"=>$char_tribe,
                "char_gender"=>$char_gender,
                "char_freecompany"=>$char_freecompany,
                "save_dir"=>$save_dir,
            ]);

    }
}