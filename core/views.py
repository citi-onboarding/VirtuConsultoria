from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from .forms import emailForm
from django.core.mail import send_mail

def index(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = emailForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            nome = form.cleaned_data['nome']
            telefone = form.cleaned_data['telefone']
            email = form.cleaned_data['email']
            assunto = form.cleaned_data['assunto']
            conheceu = form.cleaned_data['conheceu']
            mensagem = form.cleaned_data['mensagem']

            fullContent = 'Nome:{}\nTelefone: {}\nEmail: {}\nComo conheceu: {}\nMensagem: {}'.format(nome, telefone, email, conheceu, mensagem)   

            send_mail(
                assunto,    #Subject
                fullContent,  #Message
                'friendlybot4ever@gmail.com',   #email sender
                ['friendlybot4ever@gmail.com'], #email receiver
                fail_silently=False,
            )

    # if a GET (or any other method) we'll create a blank form
    else:
        form = emailForm()

    return render(request, 'index.html', {'form': form})