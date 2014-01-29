    function isInteger(value) {
        if ((undefined === value) || (null === value)) {
            return false;
        }
        return value % 1 == 0;
    }
    $(function() {

        var tittles = $('#tittles').text();
        tittles = JSON.parse(tittles);
        console.log(tittles)

        for (var i = 0; i < tittles[0].length; i++) {
            //console.log(tittles[i])
            console.log(isNaN(tittles[1][i]))

            if (!isNaN(tittles[1][i])) {
                $('#latitud').append('<option value="' + tittles[0][i] + '" >' + tittles[0][i] + ' -(' + tittles[1][i] + ')-' + '</option>');
                $('#longitud').append('<option value="' + tittles[0][i] + '" >' + tittles[0][i] + ' -(' + tittles[1][i] + ')-' + '</option>');

            }

            $("#eval_tittles").append('<li><input type="radio" name="tittle_id" value="' + tittles[0][i] + '"><input type="checkbox"  name="tittle" value="' + tittles[0][i] + '">' + tittles[0][i] + '(' + tittles[1][i] + ')</li>');



        };



        $('#eval_tittles').find(':input').each(function() {


        })



    });