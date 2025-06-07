import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_charts/charts.dart';

import '../models/sales.dart';

class CategoryProductsChart extends StatelessWidget {
  final List<Sales> salesData;
  const CategoryProductsChart({Key? key, required this.salesData})
    : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SfCartesianChart(
      primaryXAxis: CategoryAxis(),
      primaryYAxis: NumericAxis(),
      tooltipBehavior: TooltipBehavior(enable: true),
      series: <CartesianSeries<Sales, String>>[
        ColumnSeries<Sales, String>(
          dataSource: salesData,
          xValueMapper: (Sales sales, _) => sales.label,
          yValueMapper: (Sales sales, _) => sales.earning,
          name: 'Sales',
          color: Colors.blue,
          dataLabelSettings: const DataLabelSettings(isVisible: true),
        ),
      ],
    );
  }
}
