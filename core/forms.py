from django import forms

class emailForm(forms.Form):
    
    comoConheceuOpcoes = (
        ('Selecione', 'Selecione'),
        ('Indicação', 'Indicação'),
        ('Mídias Sociais', 'Mídias Sociais'),
        ('Outros', 'Outros'),
    )

    nome = forms.CharField(label="", widget=forms.TextInput(attrs={'placeholder': 'Nome'}), max_length=60)
    telefone = forms.CharField(label="", widget=forms.TextInput(attrs={'placeholder': 'Telefone'}), max_length=20)
    email = forms.EmailField(label="", widget=forms.TextInput(attrs={'placeholder': 'Email'}), max_length=60)
    assunto = forms.CharField(label="", widget=forms.TextInput(attrs={'placeholder': 'Assunto'}), max_length=200)
    conheceu = forms.ChoiceField(label="", choices=comoConheceuOpcoes)
    mensagem = forms.CharField(label="", widget=forms.Textarea(attrs={'width':"100%", 'cols' : "30", 'rows': "5", 'placeholder': 'Mensagem'}))