// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

(function() {
    

    function formatDate(date) {
        let diff = new Date() - date; // the difference in milliseconds

        if (diff < 1000) { // less than 1 second
            return 'right now';
        }

        let sec = Math.floor(diff / 1000); // convert diff to seconds

        if (sec < 60) {
            return sec + ' sec. ago';
        }

        let min = Math.floor(diff / 60000); // convert diff to minutes
        if (min < 60) {
            return min + ' min. ago';
        }

        // format the date
        // add leading zeroes to single-digit day/month/hours/minutes
        let d = date;
        d = [
            '0' + d.getDate(),
            '0' + (d.getMonth() + 1),
            '' + d.getFullYear(),
            '0' + d.getHours(),
            '0' + d.getMinutes()
        ].map(component => component.slice(-2)); // take last 2 digits of every component

        // join the components into date
        return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
    };

    function refresh_comments() {
        fetch("/comments").then(function(response) { return response.json(); }).then(function(data) {
            var comments = document.getElementById("comments_list");
            comments.innerHTML = "";
            for (var item in data) {
                var date = new Date(data[item].timestamp);
                var span = document.createElement("span");
                span.innerText = data[item].text + "\t" + formatDate(date);
                comments.appendChild(span);
                comments.appendChild(document.createElement("br"));
            }
        });
    }

    refresh_comments();

    var current = 0;
    document.onkeypress = function(e) {
        if (e.charCode != 13) {
            return;
        }
        current += 1;
        target = "part_" + current;
        item = document.getElementById(target);
        if (item != null) {
            item.setAttribute("style", "");
        }
        var comment_box = document.getElementById("comment_box");
        if (current == 6) {
            comment_box.focus();
        }
        if (current == 7) {
            var text = comment_box.value ?? "";
            comment_box.disabled = true;
            text = text.trim();
            if (text != "") {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                fetch('/comments', {
                    method: 'PUT',
                    body: text
                }).then(function() { refresh_comments(); });
            }
        }
    };

})();
