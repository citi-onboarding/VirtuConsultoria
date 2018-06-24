from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from .forms import emailForm
from django.core.mail import send_mail

def index(request):
    # Trata os dados vindos do form caso a página tenha sido acionada pelo form
    if request.method == 'POST':
        # Guarda os dados do form na variável form
        form = emailForm(request.POST)
        # Caso o form seja válido
        if form.is_valid():
            # Guarda cada um dos campos do form em suas respectivas variáveis
            nome = form.cleaned_data['nome']
            telefone = form.cleaned_data['telefone']
            email = form.cleaned_data['email']
            assunto = form.cleaned_data['assunto']
            conheceu = form.cleaned_data['conheceu']
            mensagem = form.cleaned_data['mensagem']

            # Gera o corpo do Email como uma string
            fullContent = 'Nome:{}\nTelefone: {}\nEmail: {}\nComo conheceu: {}\nMensagem: {}'.format(nome, telefone, email, conheceu, mensagem)   

            send_mail(
                assunto,    # Assunto do email
                fullContent,  # Corpo do email
                'virtu.consultoriapolitica@gmail.com',   # email de envio
                ['virtu.consultoriapolitica@gmail.com'], #email de destino
                fail_silently=False,
            )

            form = emailForm()


    # Caso a página tenha sido acessada via URL gera um form em branco
    else:
        form = emailForm()

    return render(request, 'index.html', {'form': form})