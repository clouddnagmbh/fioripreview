sap.ui.define(
  ["sap/ui/core/mvc/Controller"],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("at.clouddna.showcase.controller.Main", {
      onInit: function () {
        let oData = [
          {
            produkt: "Lenovo Laptop",
            beschreibung: "12 Zoll, neu",
            kategorie: "Laptop",
            anzahl: 7,
            color: "Warning",
            rating: 3,
            maerz: 70,
            april: 40,
            mai: 20,
            colorMaerz: "Good",
            colorApril: "Critical",
            colorMai: "Error",
          },
          {
            produkt: "MacBook Pro",
            beschreibung: "13 Zoll, gebraucht, 2 Jahre alt",
            kategorie: "Laptop",
            anzahl: 13,
            color: "Success",
            rating: 5,
            maerz: 49,
            april: 90,
            mai: 80,
            colorMaerz: "Critical",
            colorApril: "Good",
            colorMai: "Good",
          },
          {
            produkt: "PC",
            beschreibung: "Windows",
            kategorie: "PC",
            anzahl: 2,
            color: "Error",
            rating: 4,
            maerz: 10,
            april: 20,
            mai: 40,
            colorMaerz: "Error",
            colorApril: "Error",
            colorMai: "Critical",
          },
          {
            produkt: "Apple Maus",
            beschreibung: "neu",
            kategorie: "Maus",
            anzahl: 4,
            color: "Error",
            rating: 4,
            maerz: 70,
            april: 90,
            mai: 80,
            colorMaerz: "Good",
            colorApril: "Good",
            colorMai: "Good",
          },
          {
            produkt: "Logitech Tastatur",
            beschreibung: "2 Monat gebraucht",
            kategorie: "Tastatur",
            anzahl: 12,
            color: "Success",
            rating: 2,
            maerz: 20,
            april: 15,
            mai: 5,
            colorMaerz: "Error",
            colorApril: "Error",
            colorMai: "Error",
          },
        ];

        let oDataModel = new sap.ui.model.json.JSONModel(oData);
        this.getView().setModel(oDataModel, "dataModel");
      },

      onListItemPressed: function () {
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("Items");
      },
    });
  }
);
