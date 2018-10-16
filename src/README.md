# Documentation

## State

### Basic feed structure

``` javascript

{
    sources: {
        byKey: {
            proStudentyGeomatiky: {
                key: "proStudentyGeomatiky",
                title: "Pro studenty geomatiky",
                type: "blog", //enumeration
                sourceType: "rssChannel",
                language: "cz",
                originUrl: "http://prostudenty.blogspot.com/",
                sourceUrl: "http://www.blogger.com",
                labels: ["education", "non-official"], //enumaration
            }
        }
    }
}

```

### Basic news structure


``` javascript

{
    news: {
        byKey: {
            'dsdjfkshf': {
                channelKey: 'proStudentyGeomatiky',
                key: 'dsdjfkshf',
                title: 'Konec blogu',
                content: 'Lorem ipsum',
                htmlContent: '<p>Lorem ipsum</p>',
                published: //ISO standard time,
                author: "Otakar Čerba",
                url: "http://prostudenty.blogspot.com/...."
            }
        }
    }
}

```