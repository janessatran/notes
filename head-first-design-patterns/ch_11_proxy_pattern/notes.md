## Chapter 11. Controlling Object Access: The Proxy Pattern

Proxy is a structural design pattern that lets you provide a substitute or a placeholder for another object. A proxy controls access to the original object, allowing you to perform something either before or after the requests gets through to the original object.

**When to use it:**

- When you have a heavyweight service that wastes system resources by being always up, even though you only need it from time to time, you can use a proxy to allow lazy initialization (aka virtual proxy).
- When you only want specific clients to access the service object, you can use a proxy to limit access control (aka protection proxy).
- When the service object is located on a remote server, you can use a proxy to handle execution locally of the remote service (aka remote proxy).
- When you want to keep a history of requests to the service object, you can cratea logging proxy.
- When you want to cache results of client resquests and manage the life cycle oft his cache, you can create a proxy that implements caching (aka caching proxy).
- When you need to be able to dismiss the heavyweight object once there are no clients that use it, you can create a proxy that keeps track of clients that obtained a reference to the service or its results. When that client list is empty, the proxy can dismiss the service object and free underlying system resources.

## The role of the "remote proxy"

A remote proxy acts as a _local representative to a remote object._ A **remote object** is an object that is running in a different address space. A **local representative** is an object that you can call local methods on and have them forwarded on to the remote object.

## Implementing a Proxy

1. Create a Service Interface which declares the interface of the Service. The proxy must follow this interface to disguise itself as a service object.
2. Create a Service class which implements the Service interface.
3. Create a Proxy class which has a reference field that points to a service object. After the proxy finishes its processes (e.g. lazy init, logging, access control, cachine, etc), it passes the request to the service object.
4. Ensure the Client class works with both services and proxies via the same interface.

## Summary

> 💡 Proxy - Provide a surrogate or placeholder for another object to control access to it.

- The Proxy Pattern provides a representation for another object in order to control the client's access to it. There are a number of ways it can manage that access.
- A Remote Proxy manages interactions between a client and a remote object.
- A Virtual Proxy controls access to an object that is expensive to instantiate.
- A Protection Proxy controls access to the methods of an object based on the caller.
- Many other variants of the Proxy Pattern exist including caching proxies, synchornization proxies, firewall proxies, copy-on-write proxies, etc
- Proxy is structully similar to Decorator, but the two patterns differ in their purpose.
- The Decorate Pattern adds behavior to an object, while Proxy controls access.
- Like any wrapper, proxies will increase the number of classes and objects in your design.
