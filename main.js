// funzioni
function getAllPaganti() {
  $.ajax({
    url: "getAllPaganti.php",
    method: "GET",
    success: function (data) {
      printPagante (data);
    },
    error: function (err) {
      console.error(err);
    }
  });
};

function printPagante (data) {
  // inizializzo handlebars
  var source = $("#pagante-template").html();
  var template = Handlebars.compile(source);
  // estrapolo valori del pagante e li stampo in pagina
  for (var pagante of data) {
    var html = template(pagante);
    $('.paganti').append(html);
  }

};

function deletePagante() {
  var cestino = $(this);
  var paganteSelezionato = cestino.parent();
  var paganteAttr = paganteSelezionato.data('id');
  $.ajax({
    url: "deletePaganti.php",
    method: "POST",
    data: {
      id: paganteAttr
    },
    success: function () {
      paganteSelezionato.remove();
    },
    error: function (err) {
      console.error(err);
    }
  })
}


$(document).ready(function () {

  getAllPaganti();

  $(document).on("click", "i.delete", deletePagante);
})
