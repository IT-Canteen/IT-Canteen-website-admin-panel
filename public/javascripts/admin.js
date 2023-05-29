//admin create
$("#adminAddFrm").submit(function (e) {
    e.preventDefault();
    var data = $("#adminAddFrm").serialize();
    REST.loginPost('/admin/create', data, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Something is wrong!',
                text: err,
                icon: 'error',
                position: 'bottom-right'
            });
        } else {
            $.toast({
                heading: 'Success!',
                text: 'An admin is added!',
                icon: 'success',
                position: 'bottom-right'
            });
            window.location.reload()
        }
    })
})

//activities post create 
$("#activitiesUpload").submit(function (e) {
    e.preventDefault();
    var data = new FormData(this);
    REST.post("/activities/create", data, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Sorry!',
                text: err,
                icon: 'error',
                position: 'bottom-right'
            });
        } else {
            window.location.reload();
            $.toast({
                heading: 'Success!',
                text: 'A post is added!',
                icon: 'success',
                position: 'bottom-right'
            });
        }
    })
});

var testOnload = () => {
    var img = document.getElementById('img');
    var img_path = document.getElementById('img-file');
    var img_file = img_path.files[0];
    var reader = new FileReader();

    reader.onloadend = () => {
        img.src = reader.result;
    }
    if (img_file) {
        reader.readAsDataURL(img_file);
    } else {
        $("#img").attr('src', data.img);
    }
}

//activities' posts' view edit
$(document).on('click', '.btnEditActivities', function () {
    var id = $(this).data("id");
    REST.get('/activities/' + id, (err, result) => {

        $("#activitiesEditFrm").trigger("reset");
        var data = result.data;
        $("#activityID").val(data.id);
        $("#descriptions").val(data.descriptions);
        $("#img").attr('src', data.img);
        $(".viewEditActivities").modal("show");

    })
})

//news' posts' view edit
$(document).on('click', '.btnEditNews', function () {
    var id = $(this).data("id");
    REST.get("/news/" + id, (err, result) => {
        $("#newsEditFrm").trigger("reset");
        var data = result.data;
        $("#newsID").val(data.id);
        $("#descriptions").val(data.descriptions);
        $("#img").attr('src', data.img);
        $(".viewEditNews").modal("show");
    })
})

//activities' post data edit
$(document).on('submit', '#activitiesEditFrm', function (e) {
    e.preventDefault();
    var id = $("#activityID").val();
    var data = new FormData(this);
    REST.putWithImg('/activities/update/' + id, data, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Error!',
                text: 'Something Wrong!',
                icon: 'error',
                position: 'bottom-right'
            });
        } else {
            var code = result.code;
            if (code == 200) {
                window.location.reload();
                $.toast({
                    heading: 'Success!',
                    text: 'post is updated!',
                    icon: 'success',
                    position: 'bottom-right'
                });
            }
        }
    })
});

//news post data edit
$(document).on('submit', '#newsEditFrm', function (e) {
    e.preventDefault();
    var id = $("#newsID").val();
    var data = new FormData(this);
    REST.putWithImg('/news/update/' + id, data, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Error!',
                text: 'Something Wrong!',
                icon: 'error',
                position: 'bottom-right'
            });
        } else {
            var code = result.code;
            if (code == 200) {
                window.location.reload();
                $.toast({
                    heading: 'Success!',
                    text: 'post is updated!',
                    icon: 'success',
                    position: 'bottom-right'
                });
            }
        }
    })
})

//activities' post data delete
$(document).on('click', '.btnDeleteActivities', function () {
    var id = $(this).data("id");
    REST.delete('/activities/delete/', id, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Error!',
                text: 'Something Wrong!',
                icon: 'error',
                position: 'bottom-right'
            });
        } else {
            $.toast({
                heading: 'Success!',
                text: 'post is updated!',
                icon: 'success',
                position: 'bottom-right'
            });
        }
    })
})

//news' post data delete
$(document).on('click', '.btnDeleteNews', function () {
    var id = $(this).data("id");
    REST.delete('/news/delete/', id, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Error!',
                text: 'Something Wrong!',
                icon: 'error',
                position: 'bottom-right'
            });
        } else {
            $.toast({
                heading: 'Success!',
                text: 'post is updated!',
                icon: 'success',
                position: 'bottom-right'
            });
        }
    })
})

//news post create 
$("#newsUpload").submit(function (e) {
    e.preventDefault();
    var data = new FormData(this);
    REST.post("/news/create", data, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Sorry!',
                text: err,
                icon: 'error',
                position: 'bottom-right'
            });
        } else {
            window.location.reload();
            $.toast({
                heading: 'Success!',
                text: 'A post is added!',
                icon: 'success',
                position: 'bottom-right'
            });
        }
    })
})

//vlogs post create
$("#vlogsUpload").submit(function (e) {
    e.preventDefault();
    var data = $("#vlogsUpload").serialize();
    REST.loginPost('/vlogs/create', data, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Sorry!',
                text: err,
                icon: 'error',
                position: 'bottom-right'
            });
        } else {
            window.location.reload();
            $.toast({
                heading: 'Success!',
                text: 'A post is added!',
                icon: 'success',
                position: 'bottom-right'
            });
        }
    })
})

//vlogs' posts' view edit
$(document).on('click', '.btnEditVlog', function () {
    var id = $(this).data("id");
    REST.get("/vlogs/" + id, (err, result) => {
        $("#vlogEditFrm").trigger("reset");
        var data = result.data;
        $("#vlogID").val(data.id);
        $("#descriptions").val(data.descriptions);
        $("#video").val(data.video);
        $(".viewEditVlog").modal("show");
    })
})

//vlogs post data edit
$(document).on('submit', '#vlogEditFrm', function (e) {
    e.preventDefault();
    var id = $("#vlogID").val();
    var data = $("#vlogEditFrm").serialize();
    REST.put("/vlogs/update/" + id, data, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Error!',
                text: 'Something Wrong!',
                icon: 'error',
                position: 'bottom-right'
            });
        }else{
            var code = result.code;
            if (code == 200) {
                window.location.reload();
                $.toast({
                    heading: 'Success!',
                    text: 'post is updated!',
                    icon: 'success',
                    position: 'bottom-right'
                });
            }
        }
    })
})


//vlogs' post data delete
$(document).on('click', '.btnDeleteVlog', function () {
    var id = $(this).data("id");
    REST.delete('/vlogs/delete/', id, (err, result) => {
        if (err) {
            $.toast({
                heading: 'Error!',
                text: 'Something Wrong!',
                icon: 'error',
                position: 'bottom-right'
            });
        } else {
            $.toast({
                heading: 'Success!',
                text: 'post is updated!',
                icon: 'success',
                position: 'bottom-right'
            });
        }
    })
})

