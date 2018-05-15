package by.bsuir.mpp.xpulse.web.rest.vm;

public class MailVM {

    private String title;

    private String message;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "MailVM{" +
            "title='" + title + '\'' +
            ", message=" + message +
            '}';
    }
}
