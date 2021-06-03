<?php 

    $title = "Tippspiel";
    $description = "by TobiCreations & PHLHG";

    $langs = array_map(function($a){
        return strToLower(explode(";",$a)[0]);
    },explode(",",$_SERVER['HTTP_ACCEPT_LANGUAGE']));

    $lang = (in_array("de",$langs) && array_search("de",$langs) < array_search("en",$langs)) ? "de" : "en";

    if(preg_match("/^\/game\/\d+\/(\w{2,10})-(\w{2,10})\/$/i",$_SERVER["REQUEST_URI"], $matches, PREG_UNMATCHED_AS_NULL)){
        $team1 = isset($matches[1]) ? htmlentities(strToUpper($matches[1])) : "TEAM1";
        $team2 = isset($matches[2]) ? htmlentities(strToUpper($matches[2])) : "TEAM2";
        $title = ($lang == "de") ? "Spiel $team1 - $team2" : "Match $team1 - $team2";
        $description = ($lang == "de") ? "Gib jetzt deinen Tipp im Tippspiel ab" : "Make your bet on Tippspiel now";
    } else if(preg_match("/^\/groups\/join\/(\d)+-(\w{2,20})\/$/i",$_SERVER["REQUEST_URI"], $matches, PREG_UNMATCHED_AS_NULL)){
        $title = ($lang == "de") ? "Gruppeneinladung" : "Group invitation";
        $description = ($lang == "de") ? "Trete der Gruppe im Tippspiel bei" : "Join the group on Tippspiel";
    }

?>
<!DOCTYPE html>
<html>
    <head>
        <title>Tippspiel 21</title>
        <!--// META //-->
        <meta charset="UTF-8"/>
        <base href="/"/>
        <meta http-equiv="language" content="deutsch, de">
        <meta name="revisit" content="After 10 days" />
        <meta name="robots" content="INDEX,FOLLOW" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=1">
        <meta name="theme-color" content="#00315e" />
        <!--// WEBAPP //-->
        <link rel="manifest" href="/manifest.webmanifest">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <!--// SEO //-->
        <meta name="description"  content="<?=$description?>" />
        <meta name="keywords" content="fussball, tippen, europameisterschaft" />
        <meta name="page-topic" content="Entertainment" />
        <meta name="language" content="Deutsch" />
        <!-- OPENGRAPH -->
        <meta property="og:title" content="<?=$title?>" />
        <meta property="og:description" content="<?=$description?>" />
        <meta property="og:image" content="/img/favicon.png" />
        <meta property="og:url" content="https://tipp.phlhg.ch" />
        <meta property="og:type" content="Entertainment" />
        <!-- TWITTER -->
        <meta name="twitter:card" content="summary_large_image"></meta>
        <meta property="og:title" content="<?=$title?>" />
        <meta property="og:description" content="<?=$description?>" />
        <meta property="og:image" content="/img/favicon.png" />
        <!--// LINKS //-->
        <link rel="canonical" href="https://tipp.phlhg.ch"/>
        <!--FAVICON-->
        <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />
        <link rel="shortcut icon" type="image/x-icon" href="/img/favicon.ico" />
        <link rel="apple-touch-icon" href="/img/favicon.png" />
        <!-- STYLESHEETS -->
        <link rel="stylesheet" href="/css/main.css?t=<?=time()?>" />
        <link rel="stylesheet" href="/css/dark.css" />
        <!-- FONTS -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Icons" />
        <!-- SCRIPTS -->
        <script>var SERVER_PORT = 15320;</script>
        <script src="/js/lang/en.js"></script>
        <script src="/js/lang/de.js"></script>
        <script src="/js/lang/de-ch.js"></script>
        <!--<script src="/js/lang/fr.js"></script>-->
        <script src="/js/h2rfp.js"></script>
        <script src="/js/enum.js"></script>
        <script src="/js/main.js"></script>
    </head>
    <body>
        <div class="tipp-splash">
            <div class="center">
                <img src="/img/icon-transparent.png"/>
                <span class="title">Tippspiel <span>21</span></span>
            </div>
            <span class="meta">by TobiCreations and PHLHG</span>
        </div>
        <header>
            <div class="inner">
                <a class="back" title="Back"><span class="material-icons">arrow_back_ios_new</span></a>
                <h1 class="heading">
                    <a class="logo" href="/" title="To Home"><img src="/img/icon-transparent.png" alt="Logo"/></a>
                    <strong>Tippspiel</strong> <span>21</span>
                </h1>
                <a href="/settings/" class="settings" title="Settings"><img src="/img/graphics/settings.svg" alt="Settings"/></a>
            </div>
        </header>
        <div class="tipp-section-wrapper"></div>
        <nav>
            <div class="tipp-nav-inner">
                <a href="/" title="Home"><img src="/img/graphics/home.svg" alt="Home" /></a>
                <a href="/stats/" title="Stats"><img src="/img/graphics/stats.svg" alt="Stats" /></a>
                <a href="/groups/" title="Groups"><img src="/img/graphics/groups.svg" alt="Groups" /></a>
                <a href="/profile/" title="Profile"><img src="/img/graphics/profile.svg" alt="Profile" /></a>
            </div>
        </nav>
        <script>
            (function(){ document.body.classList.add("loading"); })()
        </script>
    </body>
</html>