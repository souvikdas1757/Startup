const javaArr = {
  language: 'java',
  intro: 'An array is a container object that holds a fixed number of values of a single type. The length of an array is established when the array is created.',
  syntax: `dataType[] arrayName = new dataType[size];`,
  example: `public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30};
        for (int i = 0; i < arr.length; i++) {
            System.out.println(arr[i]);
        }
    }
}`,
  output: `10
20
30`,
  explanation: 'The array is initialized with 3 elements. The loop iterates from 0 to arr.length-1 and prints each element.',
  practice: ['Find maximum element in an array', 'Reverse an array in place', 'Rotate array by K positions']
}

export const documentationSeed = [
  { id: 'java-introduction', slug: 'java-introduction', title: 'Java Introduction', category: 'Java', language: 'java', content: {
    intro: 'Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible.',
    syntax: `public class Main {
    public static void main(String[] args) {
        // your code
    }
}`,
    example: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, NEXORA!");
    }
}`,
    output: 'Hello, NEXORA!',
    explanation: 'Every Java program starts from the main method inside a class.',
    practice: ['Print your name', 'Add two numbers', 'Swap two variables']
  }},
  { id: 'java-variables', slug: 'java-variables', title: 'Java Variables', category: 'Java', language: 'java', content: {
    intro: 'A variable is a container that holds a value during program execution. Java is statically typed.',
    syntax: `dataType variableName = value;`,
    example: `int age = 20;
String name = "Rahul";
double pi = 3.14;`,
    output: 'Variables declared and initialized.',
    explanation: 'Each variable must be declared with a type before use.',
    practice: ['Declare variables of all primitive types', 'Concatenate strings', 'Type casting demo']
  }},
  { id: 'java-data-types', slug: 'java-data-types', title: 'Java Data Types', category: 'Java', language: 'java', content: {
    intro: 'Java has 8 primitive data types: byte, short, int, long, float, double, char, boolean.',
    syntax: `int x = 10;
boolean flag = true;`,
    example: `byte b = 100;
short s = 1000;
int i = 100000;
long l = 100000L;`,
    output: 'Data stored in respective types.',
    explanation: 'Choose the type based on the range and precision you need.',
    practice: ['Print min/max of each type', 'Convert int to double', 'Parse string to int']
  }},
  { id: 'java-operators', slug: 'java-operators', title: 'Java Operators', category: 'Java', language: 'java', content: {
    intro: 'Operators are special symbols that perform operations on variables and values.',
    syntax: `a + b; a - b; a * b; a / b; a % b;`,
    example: `int a = 10, b = 3;
System.out.println(a / b);
System.out.println(a % b);`,
    output: `3
1`,
    explanation: 'Integer division truncates the decimal. Modulus gives the remainder.',
    practice: ['Compute average', 'Check even/odd', 'Bitwise operations demo']
  }},
  { id: 'java-conditions', slug: 'java-conditions', title: 'Java Conditions', category: 'Java', language: 'java', content: {
    intro: 'Conditional statements execute code based on boolean expressions.',
    syntax: `if (cond) { ... } else if (cond) { ... } else { ... }`,
    example: `int n = 5;
if (n % 2 == 0) System.out.println("Even");
else System.out.println("Odd");`,
    output: 'Odd',
    explanation: 'The if-else chain evaluates conditions top-down.',
    practice: ['Grade calculator', 'Leap year check', 'Largest of three numbers']
  }},
  { id: 'java-loops', slug: 'java-loops', title: 'Java Loops', category: 'Java', language: 'java', content: {
    intro: 'Loops execute a block of code repeatedly while a condition is true.',
    syntax: `for (init; cond; update) { ... }
while (cond) { ... }
do { ... } while (cond);`,
    example: `for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}`,
    output: '1 2 3 4 5',
    explanation: 'The for loop initializes i, checks the condition, runs the body, then updates i.',
    practice: ['Factorial', 'Fibonacci series', 'Multiplication table']
  }},
  { id: 'java-arrays', slug: 'java-arrays', title: 'Java Arrays', category: 'Java', language: 'java', content: javaArr },
  { id: 'java-strings', slug: 'java-strings', title: 'Java Strings', category: 'Java', language: 'java', content: {
    intro: 'Strings are immutable sequences of characters in Java.',
    syntax: `String s = "Hello";`,
    example: `String s = "NEXORA";
System.out.println(s.length());
System.out.println(s.toUpperCase());`,
    output: `6
NEXORA`,
    explanation: 'String methods return new strings since strings are immutable.',
    practice: ['Palindrome check', 'Count vowels', 'Reverse a string']
  }},
  { id: 'java-methods', slug: 'java-methods', title: 'Java Methods', category: 'Java', language: 'java', content: {
    intro: 'Methods are blocks of code that perform a specific task and can be reused.',
    syntax: `returnType methodName(params) { ... }`,
    example: `public static int add(int a, int b) {
    return a + b;
}`,
    output: '5 (when add(2,3) is called)',
    explanation: 'Methods encapsulate logic and can accept parameters and return values.',
    practice: ['Prime check method', 'Factorial method', 'GCD method']
  }},
  { id: 'java-oop', slug: 'java-oop', title: 'Java OOP', category: 'Java', language: 'java', content: {
    intro: 'Object-Oriented Programming organizes code around objects containing data and methods.',
    syntax: `class ClassName { ... }`,
    example: `class Student {
    String name;
    Student(String n) { name = n; }
    void greet() { System.out.println("Hi " + name); }
}`,
    output: 'Hi Rahul',
    explanation: 'Class defines a template; objects are instances of classes.',
    practice: ['Create a BankAccount class', 'Implement inheritance', 'Polymorphism demo']
  }},
  { id: 'java-exceptions', slug: 'java-exceptions', title: 'Java Exception Handling', category: 'Java', language: 'java', content: {
    intro: 'Exceptions are unexpected events that disrupt normal flow. Java provides try-catch-finally.',
    syntax: `try { ... } catch (Exception e) { ... } finally { ... }`,
    example: `try {
    int x = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero");
}`,
    output: 'Cannot divide by zero',
    explanation: 'The catch block handles the exception, preventing program crash.',
    practice: ['Array index handling', 'Custom exception', 'Multiple catch blocks']
  }},
  { id: 'java-collections', slug: 'java-collections', title: 'Java Collections', category: 'Java', language: 'java', content: {
    intro: 'The Collections Framework provides data structures like List, Set, Map, and Queue.',
    syntax: `List<Integer> list = new ArrayList<>();`,
    example: `List<String> names = new ArrayList<>();
names.add("Rahul");
names.add("Sneha");
System.out.println(names);`,
    output: '[Rahul, Sneha]',
    explanation: 'ArrayList is a resizable array implementation of List.',
    practice: ['Remove duplicates using Set', 'Sort a list', 'Count word frequency using Map']
  }},
  { id: 'java-lambda', slug: 'java-lambda', title: 'Java Lambda Expressions', category: 'Java', language: 'java', content: {
    intro: 'Lambdas provide a concise way to represent anonymous functions.',
    syntax: `(params) -> expression`,
    example: `List<Integer> nums = Arrays.asList(1, 2, 3, 4);
nums.forEach(n -> System.out.println(n));`,
    output: '1 2 3 4',
    explanation: 'The lambda receives each element and prints it.',
    practice: ['Filter list with predicate', 'Sort with comparator', 'Map and collect']
  }},
  { id: 'c-arrays', slug: 'c-arrays', title: 'C Arrays', category: 'C', language: 'c', content: {
    intro: 'An array in C is a fixed-size collection of elements of the same type stored contiguously.',
    syntax: `int arr[10];`,
    example: `int arr[3] = {10, 20, 30};
for (int i = 0; i < 3; i++) printf("%d ", arr[i]);`,
    output: '10 20 30',
    explanation: 'Arrays in C are zero-indexed and do not know their own length.',
    practice: ['Sum of array', 'Largest element', 'Bubble sort']
  }},
  { id: 'cpp-arrays', slug: 'cpp-arrays', title: 'C++ Arrays', category: 'C++', language: 'cpp', content: {
    intro: 'C++ supports C-style arrays and std::array / std::vector for safer alternatives.',
    syntax: `std::vector<int> v = {1, 2, 3};`,
    example: `#include <vector>
std::vector<int> v{10, 20, 30};
std::cout << v[0];`,
    output: '10',
    explanation: 'std::vector is a dynamic array that can grow.',
    practice: ['Vector sum', 'Sort vector', '2D vector']
  }},
  { id: 'python-lists', slug: 'python-lists', title: 'Python Lists', category: 'Python', language: 'python', content: {
    intro: 'Lists in Python are ordered, mutable sequences.',
    syntax: `nums = [1, 2, 3]`,
    example: `nums = [10, 20, 30]
print(nums[0], len(nums))`,
    output: '10 3',
    explanation: 'Lists support indexing, slicing, and many built-in methods.',
    practice: ['Reverse list', 'List comprehension', 'Remove duplicates']
  }},
  { id: 'js-arrays', slug: 'js-arrays', title: 'JavaScript Arrays', category: 'JavaScript', language: 'javascript', content: {
    intro: 'Arrays in JavaScript are dynamic, resizable lists that can hold mixed types.',
    syntax: `const arr = [1, 2, 3];`,
    example: `const arr = [1, 2, 3];
arr.forEach(x => console.log(x));`,
    output: '1 2 3',
    explanation: 'forEach iterates over each element.',
    practice: ['Filter even numbers', 'Map to squares', 'Reduce to sum']
  }}
]