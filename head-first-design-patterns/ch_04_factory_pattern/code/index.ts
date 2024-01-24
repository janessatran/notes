/**
 * Here's an example of using the Factory Method Design Pattern in Web Development.
 * This pattern allows us to move object construction to a special
 * method known as the factory method. The factory method
 * is responsible for construction of the desired object(s).
 *
 * Let's say we have a web app and it accepts different types of payments.
 * We can create a payment factory which handles the various payment methods
 * depending on the payment gateway type.
 *
 * To compile and run this code, cd into the code directory and run the following:
 * tsc ./index.ts --outDir ./build && node ./build/index.js
 */

/**
 * Creator class. Contains the factory method, which returns
 * an object of the same type as our product interface.
 *
 * The Creator is typically an abstract class that defines
 * an abstract factory method.
 */
abstract class PaymentPortal {
  public abstract createPaymentGateway(): PaymentGateway;

  public processPayment(amount: number) {
    const paymentGateway = this.createPaymentGateway();

    paymentGateway.processPayment(amount);
  }
}

/**
 * Product Interface.
 * Contains the operations that concrete products must implement.
 */
interface PaymentGateway {
  currencyCode: string;
  processPayment(amount: number): void;
}

/**
 * Concrete Creator - USPaymentPortal
 */
class USPaymentPortal extends PaymentPortal {
  constructor() {
    super();
  }

  public createPaymentGateway(): PaymentGateway {
    return new USPaymentGateway();
  }
}

/**
 * Concrete Product - USPaymentGateway
 */
class USPaymentGateway implements PaymentGateway {
  currencyCode: string = "USD";

  processPayment(amount: number): void {
    console.log(`Processing payment of $${amount} in ${this.currencyCode}`);
  }
}

/**
 * Concrete Creator - VietnamPaymentPortal
 */
class VNDPaymentPortal extends PaymentPortal {
  constructor() {
    super();
  }

  public createPaymentGateway(): PaymentGateway {
    return new VNDPaymentGateway();
  }
}

/**
 * Concrete Product - VNDPaymentGateway
 */
class VNDPaymentGateway implements PaymentGateway {
  currencyCode = "VND";

  processPayment(amount: number): void {
    console.log(`Processing payment of $${amount} in ${this.currencyCode}`);
  }
}

// Client code
const usPaymentPortal = new USPaymentPortal();

// Using the factory to create US payment gateway
const usPaymentGateway = usPaymentPortal.createPaymentGateway();
console.log(usPaymentGateway.processPayment(100));

const vndPaymentPortal = new VNDPaymentPortal();
// Using the factory to create Vietnam payment gateway
const vndPaymentGateway = vndPaymentPortal.createPaymentGateway();
console.log(vndPaymentGateway.processPayment(100));
