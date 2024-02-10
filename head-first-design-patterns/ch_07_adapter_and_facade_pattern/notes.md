## Chapter 7. Being Adaptive: The Adapter and Facade Patterns.

This chapter helps us understand how to wrap objects to make their interfaces look like something they're not. We do this so we can adapt a design expecting one interface to a class that implements a different interface. We're also going to learn how to wrap objects to simplify their interfaces.

### Adapters alll around us

Adapters appear everywhere in our daily lives. For example, if you've ever traveled to another country, it is not uncommon that you've had to use an AC power adapter so that your laptop plug fits into another outlet. The job of the adapter is to change the interface of the outlet into on that your laptop plug expects.

#### Object-oriented adapters

Adapters become useful in software when you need to make two different interfaces work together. This can happen you have some existing software system that you need to work a new vendor class library into, but the new vendor designed their interfaces differently than the last vendor.

Instead of writing your existing code different (since you can't change the vendors code), you can write a class that adapts the new vendor interface into the one you're expecting.

The **adapter** acts as a middleman by recieving requests from the client and converting them into requests that make sense on the vendor classes.
