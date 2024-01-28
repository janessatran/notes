## Chapter 5. One of a kind objects. The Singleton Pattern.

There are many objects we only need one of: thread pools, caches, dialog boxes, objects that handle preferences and registry settings, objectings used for logging, and objects that act as device drivers to devices like printer and graphics cards.

Singleton Pattern is a convention for ensuring one and only one object is instantiated for a given class. It gives us a global point of access, just like a global variable, but without the downsides. For example, a global variable could be created but never used. With the Singleton Pattern, you avoid this by creating objects only when they're needed.

### Implementing a Singleton Pattern in Typescript

(This was adapted to TS because that's what I code in primarily at the moment, but the book's example is in Java)

```typescript
class Singleton
  private static instance: Singleton;

  // The singleton's constructor should always be private to
  // prevent direct construction calls with the 'new' operator
  private constructor() { }

  // The static method that controls access to the singleton instance.
  // This implementation lets you subclass the singleton class
  // while keeping just one instance of each subclass around.
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }

    return Singleton.instance;
  }

```

```typescript
function clientCode() {
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();

  if (s1 === s2) {
    console.log("Success! You've created a singleton.");
  } else {
    console.log("Oh no, these are different instances :( ");
  }
}

clientCode();
// logs: "Success! You've created a singleton."
```

> 💡 The Singleton Pattern ensures a class has only one instance, and provides a global point of access to it.

### Dealing with Multithreading

Note: This doesn't pertain to JavaScript since JS is a single threaded language. All operations in JS are non-blocking and executed in the event loop.

To handle multithreading issues in Java, you can simply add the `synchronized` keyword to the method.

```java

public class Singleton {
  private static Singleton uniqueInstance;

  private Singleton() {}

  public static synchronized Singleton getInstance() {
    if (uniqueInstance == null) {
      uniqueInstance = new Singleton();
    }

    return uniqueInstance;
  }
}

```

It's expensive to synchronize the `getInstance()` method, so you should consider a few things before using this option in a multithread context.

1. Do nothing if the performance of `getInstance()` isn't critical to your application.
2. Move to an eagerly created instance rather than a lazily created one. This works because we rely on the JVM to create the unique instance of the Singleton when the class is loaded, gauranteeing that the instance will be created before any thread accesses the static `uniqueInstance` variable.

```java
public class Singleton {
  private static Singleton uniqueInstance = new Singleton();
  private Singleton() {}

  public static Singleton getInstance() {
    return uniqueInstance;
  }
}
```

3. Use the "double-checked locking" to reduce the use of synchronization in `getInstance()`. In this method, you first check to see if an instance is created, and if not _then_ you synchornize. This way, we only synchornize the first time through, just what we want.

```java
public class Singleton {
  private volatile static Singleton uniqueInstance;

  private Singleton() {}

  public static Singleton getInstance() {
    if (uniqueInstance == null) {
      // check for a unique instance,
      // if there's isn't one, enter a synchronized block
      synchronized (Singleton.class) {
        // only synchornize the first time through

        // once in the block, check for it again and if null,
        // create an instance
        if (uniqueInstance == null) {
          uniqueIntance = new Singleton();
        }
      }
    }
  }
}
```

#### Some of the problems that Singletons pose

- Reflection, serialization/deserialization
- Violates the loose coupling principle (if you make a change to the Singleton, you'll likely need to make a change to every object connected to it).
- Violates the Single Responsibility Principle

#### A solution to these problems: use an enum to create your Singleton!

```java
public enum Singleton {
  UNIQUE_INSTANCE;
}

public class SingletonClient {
  public static void main(String[] args) {
    Singleton singleton = Singleton.UNIQUE_INSTANCE;
    // use singleton here
  }
}
```

## Summary

**Singleton** - ensure a class only has one instance and provide a global point of access to it.

- The Singleton Pattern ensures you have at most one instance of a class in your application.
- The Singleton Pattern provides a global access point to that instance.
- Java's implementation of the Singleton Pattern makes use of a private constructor, a static method combined with a static variable.
- Examine your performance and resource constraints and carefully choose an appropriate Singleton implementation for multithreaded applications (and we should consider all applications multithreaded!)
- Beware of the double-checked locking implementation; it isn't thread safe in versions before Java 5.
- Be careful if you are using multiple class loaders; this could defeat the Singleton implementation and result in multiple instances.
- You can use Java's enums to sipmlify your Singleton implementation.
