from django import forms

class emailForm(forms.Form):
    
    comoConheceuOpcoes = (
        ('Selecione', 'Como conheceu a virtù?'),
        ('Redes sociais', 'Redes sociais'),
        ('Indicação', 'Indicação'),
        ('Pesquisa', 'Pesquisa'),
        ('Outros', 'Outros'),
    )

    nome = forms.CharField(label="", widget=forms.TextInput(attrs={'placeholder': 'Nome'}), max_length=60)
    telefone = forms.CharField(label="", widget=forms.TextInput(attrs={'placeholder': 'Telefone'}), max_length=20)
    email = forms.CharField(label="", widget=forms.TextInput(attrs={'placeholder': 'Email'}), max_length=60)
    assunto = forms.CharField(label="", widget=forms.TextInput(attrs={'placeholder': 'Assunto'}), max_length=200)
    conheceu = forms.ChoiceField(label="", choices=comoConheceuOpcoes)
    mensagem = forms.CharField(label="", widget=forms.TextInput(attrs={'placeholder': 'Mensagem'}), max_length=2000)