const testBox = (warna) => {
    $('.fungsibox').click(function(){
        $('body').css('backgroundColor',warna);
    });
}

export default testBox;