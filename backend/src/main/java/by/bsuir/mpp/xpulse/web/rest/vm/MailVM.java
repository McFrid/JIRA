package by.bsuir.mpp.xpulse.web.rest.vm;

import javax.validation.constraints.NotNull;
import java.util.Set;

public class MailVM {

    @NotNull
    private String title;

    @NotNull
    private String message;

    private Set<Long> userIds;


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

    public Set<Long> getUserIds() {
        return userIds;
    }

    public void setUserIds(Set<Long> userIds) {
        this.userIds = userIds;
    }

    @Override
    public String toString() {
        return "MailVM{" +
            "title='" + title + '\'' +
            ", message=" + message +
            '}';
    }
}
