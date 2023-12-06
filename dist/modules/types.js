"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "pending";
    OrderStatus["Processing"] = "processing";
    OrderStatus["Completed"] = "completed";
    OrderStatus["Cancelled"] = "cancelled";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
/*
ALTER TABLE "carts"
ADD CONSTRAINT "carts_userId_fkey1" FOREIGN KEY ("userId")
REFERENCES "users" (id) MATCH SIMPLE
ON DELETE CASCADE;




*/ 
//# sourceMappingURL=types.js.map