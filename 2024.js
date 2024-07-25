// ==UserScript==
// @name         lvandy
// @namespace    http://tampermonkey.net/
// @version      1.25
// @author       hydrachs
// @license MIT
// @match        https://basic.smartedu.cn/*
// @match        https://www.smartedu.cn/*
// @match        https://teacher.vocational.smartedu.cn/*
// @match        https://core.teacher.vocational.smartedu.cn/*
// @downloadURL https://update.greasyfork.org/scripts/486386/%EF%BC%88%E7%A7%92%E8%BF%87%E4%BF%AE%E5%A4%8D%EF%BC%892024%E5%B9%B4%E6%99%BA%E6%85%A7%E4%B8%AD%E5%B0%8F%E5%AD%A6%E6%9A%91%E5%81%87%E6%95%99%E5%B8%88%E7%A0%94%E4%BF%AE%E7%A7%92%E8%BF%87%EF%BC%8C%E6%85%A2%E6%85%A2%E7%82%B9%EF%BC%8C%E5%A4%9A%E7%82%B9%E5%87%A0%E6%AC%A1%EF%BC%81%E7%9C%8BB%E7%AB%99%E8%A7%86%E9%A2%91.user.js
// ==/UserScript==
(function() {
    'use strict'; // 使用严格模式，避免意外全局变量的创建

    // 将代码注入到控制台执行的函数
    function runCodeInConsole(code) {
        var script = document.createElement('script'); // 创建一个script元素
        script.textContent = code; // 设置脚本内容
        (document.head || document.documentElement).appendChild(script); // 将脚本添加到文档中
        script.remove(); // 执行后移除脚本元素
    }

    // 点击页面上的“我知道了”按钮的函数
    function clickKnowButton() {
        var knowButton = document.querySelector('.fish-modal-confirm-btns .fish-btn-primary'); // 通过CSS选择器获取按钮
        if (knowButton) {
            knowButton.click(); // 如果按钮存在，则点击它
        }
    }

    // 设置视频播放到倒数第二秒的函数
    function setVideoToLastSecond(video) {
        if (video) {
            video.addEventListener('loadedmetadata', function() { // 当视频元数据加载完成后
                video.currentTime = video.duration - 1; // 设置播放位置到倒数第二秒
            });
        }
    }

    // 检查并点击“我知道了”按钮的函数
    function checkAndClickKnowButton() {
        var knowButton = document.querySelector('.fish-modal-confirm-btns .fish-btn-primary'); // 获取按钮
        if (knowButton) {
            knowButton.click(); // 如果按钮存在，则点击它
            clearInterval(knowButtonCheckInterval); // 停止定时器
        }
    }

    // 设置视频播放到指定位置的函数
    function setVideoPlayPosition(video, time) {
        if (video) {
            video.currentTime = time; // 设置视频的当前播放时间
        }
    }

    // 监听点击事件
    document.addEventListener('click', function(event) {
        if (event.button === 0) { // 左键点击
            clickKnowButton(); // 点击“我知道了”按钮

            var knowButtonCheckInterval = setInterval(checkAndClickKnowButton, 500); // 每500毫秒检查一次

            setTimeout(function() {
                runCodeInConsole(`document.querySelector("video").dispatchEvent(new Event("ended"))`); // 触发视频结束事件
                runCodeInConsole(`
                    var v = document.querySelector("video");
                    if (v) {
                        v.muted = true;
                        v.playbackRate = 1.0;
                        v.play();
                    }
                `); // 设置视频静音、播放速度并播放

                var video = document.querySelector("video");
                setVideoToLastSecond(video); // 设置视频播放到倒数第二秒

                setVideoPlayPosition(video, video.duration - 0.1); // 设置视频播放到倒数0.1秒

                // 重复设置视频播放位置，确保视频播放到指定位置
                for (var i = 0; i < 2; i++) {
                    setVideoPlayPosition(video, video.duration - 0.1);
                }
            }, 100); // 延迟100毫秒执行
        }
    });
})();
