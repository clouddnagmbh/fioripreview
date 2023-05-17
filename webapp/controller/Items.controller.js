sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/BindingMode",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format",
    "./InitPage",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    BindingMode,
    JSONModel,
    FlattenedDataset,
    FeedItem,
    ChartFormatter,
    Format,
    InitPageUtil
  ) {
    "use strict";

    return Controller.extend("at.clouddna.showcase.controller.Items", {
      onInit: function () {
        Format.numericFormatter(ChartFormatter.getInstance());
        // set explored app's demo model on this sample
        let oModel = new JSONModel(this.settingsModel);
        oModel.setDefaultBindingMode(BindingMode.OneWay);
        this.getView().setModel(oModel);

        let oVizFrame = (this.oVizFrame = this.getView().byId("idVizFrame"));
        oVizFrame.setVizProperties(
          this.settingsModel.chartType.values[3].vizProperties
        );
        let dataModel = new JSONModel(this.dataPath + "/column/timeAxis.json");
        oVizFrame.setModel(dataModel);

        InitPageUtil.initPageSettings(this.getView());

        let oData = [
          {
            produkt: "Lenovo Laptop",
            beschreibung: "12 Zoll, neu",
            kategorie: "Laptop",
            anzahl: 7,
          },
          {
            produkt: "MacBook Pro",
            beschreibung: "13 Zoll, gebraucht, 2 Jahre alt",
            kategorie: "Laptop",
            anzahl: 9,
          },
          {
            produkt: "PC",
            beschreibung: "Windows",
            kategorie: "PC",
            anzahl: 2,
          },
          {
            produkt: "Apple Maus",
            beschreibung: "neu",
            kategorie: "Maus",
            anzahl: 5,
          },
          {
            produkt: "Logitech Tastatur",
            beschreibung: "2 Monat gebraucht",
            kategorie: "Tastatur",
            anzahl: 12,
          },
        ];
        let oDataModel = new sap.ui.model.json.JSONModel(oData);
        this.getView().setModel(oDataModel, "dataModel");

        let oView = this.getView();
        let oProcessFlow1 = oView.byId("processflow1");

        let sDataPath = sap.ui.require.toUrl(
          "at/clouddna/showcase/controller/json/ProcessFlowLanesAndNodes.json"
        );
        let oModelPf1 = new JSONModel(sDataPath);
        oView.setModel(oModelPf1, "processFlowModel");
        oModelPf1.attachRequestCompleted(
          oProcessFlow1.updateModel.bind(this.oProcessFlow1)
        );
      },

      onZoomIn: function () {
        let oView = this.getView();
        let oProcessFlow1 = oView.byId("processflow1").zoomIn();

        MessageToast.show(
          "Zoom level changed to: " + oProcessFlow1.getZoomLevel()
        );
      },

      onZoomOut: function () {
        let oView = this.getView();
        let oProcessFlow1 = oView.byId("processflow1").zoomOut();

        MessageToast.show(
          "Zoom level changed to: " + oProcessFlow1.getZoomLevel()
        );
      },

      dataPath: "/date_revenue_cost",

      settingsModel: {
        chartType: {
          name: "Chart Type",
          defaultSelected: "3",
          values: [
            {
              key: "0",
              name: "Bubble Chart",
              vizType: "timeseries_bubble",
              json: "/bubble/medium.json",
              value: ["Cost"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Cost",
                    value: "{Cost}",
                  },
                  {
                    name: "Revenue",
                    value: "{Revenue}",
                  },
                ],

                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                },
                valueAxis: {
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                categoryAxis: {
                  title: {
                    visible: true,
                  },
                },
                sizeLegend: {
                  formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                  title: {
                    visible: true,
                  },
                },
                title: {
                  visible: false,
                },
              },
            },
            {
              key: "1",
              name: "Column Chart",
              vizType: "timeseries_column",
              json: "/column/medium.json",
              value: ["Cost"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Cost",
                    value: "{Cost}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                },
                valueAxis: {
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                title: {
                  visible: false,
                },
              },
            },
            {
              key: "2",
              name: "Column Chart with Multiple Series",
              vizType: "timeseries_column",
              json: "/timeBulletStacked.json",
              value: ["Cost2", "Cost1"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Cost2",
                    value: "{Cost2}",
                  },
                  {
                    name: "Cost1",
                    value: "{Cost1}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                },
                valueAxis: {
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                title: {
                  visible: false,
                },
              },
            },
            {
              key: "3",
              name: "Line Chart",
              vizType: "timeseries_line",
              json: "/column/timeAxis.json",
              value: ["Revenue"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Revenue",
                    value: "{Revenue}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                },
                valueAxis: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                timeAxis: {
                  title: {
                    visible: false,
                  },
                  interval: {
                    unit: "",
                  },
                },
                title: {
                  visible: false,
                },
                interaction: {
                  syncValueAxis: false,
                },
              },
            },
            {
              key: "4",
              name: "Line Chart with Dynamic Value Axis",
              vizType: "timeseries_line",
              json: "/column/timeAxis.json",
              value: ["Revenue"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Revenue",
                    value: "{Revenue}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                },
                valueAxis: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                timeAxis: {
                  title: {
                    visible: false,
                  },
                },
                title: {
                  visible: false,
                },
                interaction: {
                  syncValueAxis: true,
                },
              },
            },
            {
              key: "5",
              name: "Scatter Chart",
              vizType: "timeseries_scatter",
              json: "/column/large.json",
              value: ["Cost"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Cost",
                    value: "{Cost}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                },
                valueAxis: {
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                title: {
                  visible: false,
                },
              },
            },
            {
              key: "6",
              name: "Combined Column & Line",
              vizType: "timeseries_combination",
              json: "/column/medium.json",
              value: ["Revenue", "Cost"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Revenue",
                    value: "{Revenue}",
                  },
                  {
                    name: "Cost",
                    value: "{Cost}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                },
                valueAxis: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                timeAxis: {
                  title: {
                    visible: false,
                  },
                  interval: {
                    unit: "",
                  },
                },
                title: {
                  visible: false,
                },
                interaction: {
                  syncValueAxis: false,
                },
              },
            },
            {
              key: "7",
              name: "Combined Column & Line with Dual Axis",
              vizType: "dual_timeseries_combination",
              json: "/column/medium.json",
              value: ["Revenue", "Cost"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Revenue",
                    value: "{Revenue}",
                  },
                  {
                    name: "Cost",
                    value: "{Cost}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                },
                valueAxis: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                valueAxis2: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                timeAxis: {
                  title: {
                    visible: false,
                  },
                  interval: {
                    unit: "",
                  },
                },
                title: {
                  visible: false,
                },
                interaction: {
                  syncValueAxis: false,
                },
              },
            },
            {
              key: "8",
              name: "Bullet",
              vizType: "timeseries_bullet",
              json: "/timeBulletStacked.json",
              value: ["Cost", "Budget"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Cost",
                    value: "{Cost}",
                  },
                  {
                    name: "Budget",
                    value: "{Budget}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                  dataPointStyle: {
                    rules: [
                      {
                        dataContext: { Cost: "*" },
                        properties: {
                          color: "sapUiChartPaletteSequentialHue1Light1",
                        },
                        displayName: "Actual",
                        dataName: { Cost: "Actual" },
                      },
                    ],
                  },
                },
                valueAxis: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                valueAxis2: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                timeAxis: {
                  title: {
                    visible: false,
                  },
                  interval: {
                    unit: "",
                  },
                },
                title: {
                  visible: false,
                },
                interaction: {
                  syncValueAxis: false,
                },
              },
            },
            {
              key: "9",
              name: "Bullet Chart with Multiple Series",
              vizType: "timeseries_bullet",
              json: "/timeMultiple.json",
              value: ["Actual", "Budget"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                  {
                    name: "Country",
                    value: "{Country}",
                  },
                ],
                measures: [
                  {
                    name: "Actual",
                    value: "{Actual}",
                  },
                  {
                    name: "Budget",
                    value: "{Budget}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                },
                valueAxis: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                valueAxis2: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                timeAxis: {
                  title: {
                    visible: false,
                  },
                  interval: {
                    unit: "",
                  },
                },
                title: {
                  visible: false,
                },
                interaction: {
                  syncValueAxis: false,
                },
              },
            },
            {
              key: "10",
              name: "Stacked Column",
              vizType: "timeseries_stacked_column",
              json: "/timeBulletStacked.json",
              value: ["Cost2", "Cost1"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Cost2",
                    value: "{Cost2}",
                  },
                  {
                    name: "Cost1",
                    value: "{Cost1}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                },
                valueAxis: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                valueAxis2: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                timeAxis: {
                  title: {
                    visible: false,
                  },
                  interval: {
                    unit: "",
                  },
                },
                title: {
                  visible: false,
                },
                interaction: {
                  syncValueAxis: false,
                },
              },
            },
            {
              key: "11",
              name: "Stacked Column 100%",
              vizType: "timeseries_100_stacked_column",
              json: "/timeBulletStacked.json",
              value: ["Cost2", "Cost1"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Cost2",
                    value: "{Cost2}",
                  },
                  {
                    name: "Cost1",
                    value: "{Cost1}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                },
                valueAxis: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                valueAxis2: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                timeAxis: {
                  title: {
                    visible: false,
                  },
                  interval: {
                    unit: "",
                  },
                },
                title: {
                  visible: false,
                },
                interaction: {
                  syncValueAxis: false,
                },
              },
            },
            {
              key: "12",
              name: "Waterfall",
              vizType: "timeseries_waterfall",
              json: "/timeWaterFall.json",
              value: ["Change of Stock"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Change of Stock",
                    value: "{Change of Stock}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                },
                valueAxis: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                timeAxis: {
                  title: {
                    visible: false,
                  },
                  interval: {
                    unit: "",
                  },
                },
                title: {
                  visible: false,
                },
                interaction: {
                  syncValueAxis: false,
                },
              },
            },
            {
              key: "13",
              name: "Periodic Waterfall",
              vizType: "timeseries_waterfall",
              json: "/demands_supplies.json",
              value: ["Supplies", "Demands"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Demands",
                    value: "{Demands}",
                  },
                  {
                    name: "Supplies",
                    value: "{Supplies}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  window: {
                    start: "firstDataPoint",
                    end: null,
                  },
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                    recapTitle: "End of day",
                    showRecap: true,
                  },
                  startValue: 10,
                },
                valueAxis: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                timeAxis: {
                  title: {
                    visible: false,
                  },
                  interval: {
                    unit: "",
                  },
                },
                legend: {
                  title: {
                    visible: false,
                  },
                  label: {
                    text: {
                      negativeValue: "Demands",
                      positiveValue: "Supplies",
                    },
                  },
                },
                title: {
                  visible: false,
                },
                interaction: {
                  syncValueAxis: false,
                },
              },
            },
            {
              key: "14",
              name: "Stacked Combination",
              vizType: "info/timeseries_stacked_combination",
              json: "/timeBulletStacked.json",
              value: ["Cost2", "Cost1", "Revenue"],
              dataset: {
                dimensions: [
                  {
                    name: "Date",
                    value: "{Date}",
                    dataType: "date",
                  },
                ],
                measures: [
                  {
                    name: "Cost1",
                    value: "{Cost1}",
                  },
                  {
                    name: "Cost2",
                    value: "{Cost2}",
                  },
                  {
                    name: "Revenue",
                    value: "{Revenue}",
                  },
                ],
                data: {
                  path: "/milk",
                },
              },
              vizProperties: {
                plotArea: {
                  window: {
                    start: "firstDataPoint",
                    end: "lastDataPoint",
                  },
                  dataLabel: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT_MFD2,
                    visible: false,
                  },
                  dataShape: {
                    primaryAxis: ["bar", "bar", "line"],
                  },
                },
                valueAxis: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                valueAxis2: {
                  visible: true,
                  label: {
                    formatString: ChartFormatter.DefaultPattern.SHORTFLOAT,
                  },
                  title: {
                    visible: false,
                  },
                },
                timeAxis: {
                  title: {
                    visible: false,
                  },
                  interval: {
                    unit: "",
                  },
                },
                title: {
                  visible: false,
                },
                interaction: {
                  syncValueAxis: false,
                },
              },
            },
          ],
        },
      },

      oVizFrame: null,
      chartTypeSelect: null,
      chart: null,

      // onInit: function (evt) {
      //   Format.numericFormatter(ChartFormatter.getInstance());
      //   // set explored app's demo model on this sample
      //   let oModel = new JSONModel(this.settingsModel);
      //   oModel.setDefaultBindingMode(BindingMode.OneWay);
      //   this.getView().setModel(oModel);

      //   let oVizFrame = (this.oVizFrame = this.getView().byId("idVizFrame"));
      //   oVizFrame.setVizProperties(
      //     this.settingsModel.chartType.values[3].vizProperties
      //   );
      //   let dataModel = new JSONModel(this.dataPath + "/column/timeAxis.json");
      //   oVizFrame.setModel(dataModel);

      //   let oPopOver = this.getView().byId("idPopOver");
      //   oPopOver.connect(oVizFrame.getVizUid());
      //   oPopOver.setFormatString({
      //     Cost: ChartFormatter.DefaultPattern.STANDARDFLOAT,
      //     Revenue: ChartFormatter.DefaultPattern.STANDARDFLOAT,
      //   });

      //   InitPageUtil.initPageSettings(this.getView());
      // },
      onAfterRendering: function () {
        this.chartTypeSelect = this.getView().byId("chartTypeSelect");
      },
      onChartTypeChanged: function (oEvent) {
        if (this.oVizFrame) {
          let selectedKey = (this.chart = parseInt(
            oEvent.getSource().getSelectedKey()
          ));
          let bindValue = this.settingsModel.chartType.values[selectedKey];
          this.oVizFrame.destroyDataset();
          this.oVizFrame.destroyFeeds();
          this.oVizFrame.setVizType(bindValue.vizType);
          let dataModel = new JSONModel(this.dataPath + bindValue.json);
          this.oVizFrame.setModel(dataModel);
          let oDataset = new FlattenedDataset(bindValue.dataset);
          this.oVizFrame.setDataset(oDataset);
          let props = bindValue.vizProperties;
          if (selectedKey !== 8 && props.plotArea) {
            props.plotArea.dataPointStyle = null;
          }
          this.oVizFrame.setVizProperties(props);
          let feedValueAxis, feedValueAxis2, feedActualValues, feedTargetValues;
          if (selectedKey === 7) {
            feedValueAxis = new FeedItem({
              uid: "valueAxis",
              type: "Measure",
              values: [bindValue.value[0]],
            });
            feedValueAxis2 = new FeedItem({
              uid: "valueAxis2",
              type: "Measure",
              values: [bindValue.value[1]],
            });
          } else if (selectedKey === 8 || selectedKey === 9) {
            feedActualValues = new FeedItem({
              uid: "actualValues",
              type: "Measure",
              values: [bindValue.value[0]],
            });
            feedTargetValues = new FeedItem({
              uid: "targetValues",
              type: "Measure",
              values: [bindValue.value[1]],
            });
          } else {
            feedValueAxis = new FeedItem({
              uid: "valueAxis",
              type: "Measure",
              values: bindValue.value,
            });
          }

          let feedTimeAxis = new FeedItem({
              uid: "timeAxis",
              type: "Dimension",
              values: ["Date"],
            }),
            feedBubbleWidth = new FeedItem({
              uid: "bubbleWidth",
              type: "Measure",
              values: ["Revenue"],
            }),
            feedTimeBulletColor = new FeedItem({
              uid: "color",
              type: "Dimension",
              values: ["Country"],
            });
          switch (selectedKey) {
            case 0:
              this.oVizFrame.addFeed(feedValueAxis);
              this.oVizFrame.addFeed(feedTimeAxis);
              this.oVizFrame.addFeed(feedBubbleWidth);
              break;
            case 7:
              this.oVizFrame.addFeed(feedValueAxis);
              this.oVizFrame.addFeed(feedValueAxis2);
              this.oVizFrame.addFeed(feedTimeAxis);
              break;
            case 9:
              this.oVizFrame.addFeed(feedTimeBulletColor);
            // fall through
            case 8:
              this.oVizFrame.addFeed(feedActualValues);
              this.oVizFrame.addFeed(feedTargetValues);
              this.oVizFrame.addFeed(feedTimeAxis);
              this.oVizFrame.addFeed(feedValueAxis);
              break;
            default:
              this.oVizFrame.addFeed(feedValueAxis);
              this.oVizFrame.addFeed(feedTimeAxis);
              break;
          }
        }
      },
    });

    return Controller;
  }
);
