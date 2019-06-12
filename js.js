function validate_form ( )
{
	valid = true;

    if ( document.form.name.value == "" )
    {
        alert ( "Пожалуйста заполните поле 'Ваше имя'." );
        valid = false;
    }

    return valid;
}

// для имени
reg = [а-я]/igm;
// для e-mail
reg = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
// для телефона
reg = /^\d[\d\(\)\ -]{4,14}\d$/;