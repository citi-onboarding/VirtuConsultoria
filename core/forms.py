from django import forms

class emailForm(forms.Form):
    nome = forms.CharField(label='Subject', max_length=100)
    telefone = forms.CharField(label='Your Email', max_length=100)
    email = forms.CharField(label='Message', max_length=500)
    assunto = forms.CharField(label='Message', max_length=500)
    conheceu = forms.CharField(label='Message', max_length=500)
    assunto = forms.CharField(label='Message', max_length=500)