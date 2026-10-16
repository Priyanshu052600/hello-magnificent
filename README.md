# Hello, Magnificent ✨

A Spring Boot MVC app that asks for your name and greets you in grand style:
a starfield, an aurora, gold letters revealed one by one, and confetti bursts.
Click anywhere on the greeting page for more confetti.

## Stack
- Java 17+, Spring Boot 3.3 (Spring MVC + Thymeleaf + Bean Validation)
- Plain CSS and JavaScript (no frontend build step)

## Run
```bash
mvn spring-boot:run
```
Then open http://localhost:8080

## Test
```bash
mvn test
```

## Build a runnable jar
```bash
mvn clean package
java -jar target/hello-magnificent-1.0.0.jar
```
> Requires a JDK 17+ `java` on your PATH. If `java -version` shows 1.8, run it with
> your newer JDK, e.g. `/opt/homebrew/opt/openjdk/bin/java -jar target/hello-magnificent-1.0.0.jar`.

## Docker
```bash
docker build -t hello-magnificent .
docker run -p 8080:8080 hello-magnificent
```

## CI/CD
- **CI:** `.github/workflows/ci.yml` runs the tests, builds the jar and checks that
  the Docker image builds on every push to `main` and on every pull request.
- **CD:** `render.yaml` is a Render Blueprint. Once the repo is connected to Render,
  every push to `main` redeploys automatically. The app reads the `PORT` env var.

## Structure
```
src/main/java/com/workspace/hello/
├── HelloMagnificentApplication.java   # entry point
├── GreetingController.java            # GET / (form), POST /greet (greeting)
├── GreetingForm.java                  # validated form object
└── GreetingService.java               # picks a grand tagline
src/main/resources/
├── templates/index.html               # name form
├── templates/greeting.html            # magnificent greeting
├── static/css/style.css               # styling & animations
└── static/js/effects.js               # stars, letter reveal, confetti
```
