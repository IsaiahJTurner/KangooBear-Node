$("li").click(function() {
  var dosage = prompt("What would you like to prescribe?");
  $this = $(this);
  $.ajax({
    type: "PATCH",
    url: "/api/patients/" + $this.attr("data-id"),
    data: JSON.stringify({
      dosage: dosage
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {
      $this.find(".value").first().html(dosage);
    },
    failure: function(errMsg) {
    }
  });
});