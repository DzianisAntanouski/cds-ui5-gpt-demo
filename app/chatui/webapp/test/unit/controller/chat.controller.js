/*global QUnit*/

sap.ui.define([
	"chatui/controller/chat.controller"
], function (Controller) {
	"use strict";

	QUnit.module("chat Controller");

	QUnit.test("I should test the chat controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
