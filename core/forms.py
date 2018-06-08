from django import forms

class emailForm(forms.Form):
    
    comoConheceuOpcoes = (
        ('Selecione', 'Selecione'),
        ('Indicação', 'Indicação'),
        ('Mídias Sociais', 'Mídias Sociais'),
        ('Outros', 'Outros'),
    )

    nome = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Nome'}), max_length=100)

    telefone = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Telefone'}), max_length=100)

    email = forms.EmailField(widget=forms.TextInput(attrs={'placeholder': 'Email'}), max_length=500)

    assunto = forms.CharField(widget=forms.TextInput(attrs={'placeholder': 'Assunto'}), max_length=500)

    conheceu = forms.ChoiceField(choices=comoConheceuOpcoes)

    mensagem = forms.CharField(widget=forms.Textarea(attrs={'width':"100%", 'cols' : "30", 'rows': "5", 'placeholder': 'Mensagem'}))