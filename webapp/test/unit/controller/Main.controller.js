/*global QUnit*/

sap.ui.define(
  ["atclouddna/showcase/controller/Main.controller"],
  function (Controller) {
    "use strict";

    QUnit.module("Main Controller");

    QUnit.test("I should test the Main controller", function (assert) {
      let oAppController = new Controller();
      oAppController.onInit();
      assert.ok(oAppController);
    });
  }
);
