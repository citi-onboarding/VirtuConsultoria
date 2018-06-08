from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse
from .forms import emailForm
from django.core.mail import send_mail

def get_name(request):
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = emailForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            # process the data in form.cleaned_data as required
            # ...
            # redirect to a new URL:
            subject = form.cleaned_data['subject']
            yourEmail = form.cleaned_data['yourEmail']
            content = form.cleaned_data['content']

            fullContent = 'Email:\n{}\nConteúdo:\n{}'.format(subject, yourEmail, content)

            send_mail(
                subject,    #Subject
                fullContent,  #Message
                'friendlybot4ever@gmail.com',   #email sender
                ['friendlybot4ever@gmail.com'], #email receiver
                fail_silently=False,
            )

    # if a GET (or any other method) we'll create a blank form
    else:
        form = emailForm()

    return render(request, 'index.html', {'form': form})

def test(request):
    return HttpResponse('test')

def ok(request):
    return HttpResponse('ok')