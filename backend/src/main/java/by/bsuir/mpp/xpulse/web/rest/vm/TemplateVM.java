package by.bsuir.mpp.xpulse.web.rest.vm;

public class TemplateVM {

    private String name;

    private String content;

    public TemplateVM(String name, String content) {
        this.name = name;
        this.content = content;
    }

    public TemplateVM() {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "TemplateVM{" +
            "name='" + name + '\'' +
            ", content=" + content +
            '}';
    }
}
