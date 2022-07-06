const { BadRequestError, NotFoundError } = require("../utils/errors");
const db = require("../db");

class Order {
  static async listOrdersForUser({user}) {
    const userId = await db.query(
      `SELECT id FROM users
            WHERE email = $1;
            `,
      [user.email]
      );
      const orderId = userId.rows[0].id
      const query = `SELECT orders.id AS "orderId", orders.customer_id AS "customerId", order_details.quantity AS "quantity", products.name AS "name", products.price AS "price" FROM orders 
       INNER JOIN order_details ON  order_details.order_id = orders.id
        INNER JOIN products ON products.id = order_details.product_id
        WHERE orders.customer_id = $1`;
      const userorders = await db.query(query, [orderId])
      return userorders.rows
  }

  static async createOrder({ user, order }) {
    const requiredFields = ["customer_id"];
    requiredFields.forEach((field) => {
      if (!order.hasOwnProperty(field)) {
        throw new BadRequestError(
          `Required Field -${field} missing frim request body`
        );
      }
    });
    const userId = await db.query(
      `SELECT id FROM users
            WHERE email = $1;
            `,
      [user.email]
    );
    const orderId = await db.query(
      `INSERT INTO orders (customer_id)
                VALUES( $1)
                RETURNING id;
            `,
      [userId]
    );
    order.forEach((product) => {
      const query = `INSERT INTO order_details (order_id, product_id, quantity, discount)
            VALUES ($1, $2, $3, $4)
            RETURNING order_id;`;
      db.query(query, [
        orderId,
        product.id,
        product.quantity,
        product.discount,
      ]);
    });
      
  }
}
module.exports = Order;
