function main() {
    var page = div();
    page.innerHTML = template;
    renderWithDefaults(profile, {
        user,
        field,
        model,
        fields: data.from("/user/profile.yml")
    });
    return page;
}