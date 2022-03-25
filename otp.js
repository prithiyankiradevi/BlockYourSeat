var chars = "012346789";
        var string_length = 4;
        var randomstring = '';
    //    console.log( 'line',Math.floor(Math.random()*10))
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            console.log(rnum)
            randomstring += chars.substring(rnum,rnum+1);
        }
        console.log(randomstring)