import java.util.ArrayList;
import java.util.List;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequestMapping("/api")
public class QuizApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuizApplication.class, args);
    }

    @GetMapping("/questions")
    public List<Question> getQuestions() {
        List<Question> questions = new ArrayList<>();
        
        questions.add(new Question(
            1, 
            "What is the capital of France?", 
            List.of("London", "Paris", "Berlin", "Madrid"), 
            1
        ));
        
        questions.add(new Question(
            2, 
            "Which language runs in a web browser?", 
            List.of("Java", "C", "Python", "JavaScript"), 
            3
        ));
        
        questions.add(new Question(
            3, 
            "What does HTML stand for?", 
            List.of(
                "Hypertext Markup Language",
                "Hypertext Markdown Language",
                "Hyperloop Machine Language",
                "Helicopters Terminals Motorboats Lamborginis"
            ), 
            0
        ));
        
        return questions;
    }

    static class Question {
        private int id;
        private String question;
        private List<String> options;
        private int correctAnswer;

        public Question(int id, String question, List<String> options, int correctAnswer) {
            this.id = id;
            this.question = question;
            this.options = options;
            this.correctAnswer = correctAnswer;
        }

        // Getters
        public int getId() { return id; }
        public String getQuestion() { return question; }
        public List<String> getOptions() { return options; }
        public int getCorrectAnswer() { return correctAnswer; }
    }
}
