import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

import '../../../constants/error_handling.dart';
import '../../../constants/global_variable.dart';
import '../../../constants/utils.dart';
import '../../../models/product.dart';
import '../../../models/user.dart';
import '../../../provider/user_provider.dart';

class ProductDetailsServices {
  void addToCart({
    required BuildContext context,
    required Product product,
  }) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);

    try {
      http.Response res = await http.post(
        Uri.parse('$uri/api/add-to-cart'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'x-auth-token': userProvider.user.token,
        },
        body: jsonEncode({'id': product.id!}),
      );

      httpErrorHandle(
        response: res,
        context: context,
        onSuccess: () {
          User user = userProvider.user.copyWith(
            cart: jsonDecode(res.body)['cart'],
          );
          userProvider.setUserFromModel(user);
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }

  void rateProduct({
    required BuildContext context,
    required Product product,
    required double rating,
  }) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);

    try {
      http.Response res = await http.post(
        Uri.parse('$uri/api/rate-product'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'x-auth-token': userProvider.user.token,
        },
        body: jsonEncode({'id': product.id!, 'rating': rating}),
      );

      httpErrorHandle(response: res, context: context, onSuccess: () {});
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
