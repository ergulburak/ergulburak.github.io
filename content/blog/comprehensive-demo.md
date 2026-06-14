---
title_tr: Kapsamlı Markdown ve Dil Desteği Testi
title_en: Comprehensive Markdown & Translation Test
date: 2026-06-12
tags: [markdown, test, bilingual]
---

[TR]
Bu paragraf sadece Türkçe seçiliyken görünür. Aşağıda markdown'ın tüm özelliklerini test edeceğimiz alanlar yer alıyor. Sistemimiz seçilen dile göre sadece ilgili etiketlerin arasındaki metinleri gösterir.
[/TR]
[EN]
This paragraph is only visible when English is selected. Below are the sections where we test all markdown features. Our system displays only the text within the relevant tags based on the selected language.
[/EN]

[TR]
## Başlık H2
Markdown destekli blog sistemimize hoş geldiniz!

### Başlık H3
Bazı liste elemanları:
- Birinci madde
- İkinci madde
  - Alt madde A
  - Alt madde B
[/TR]
[EN]
## Heading H2
Welcome to our Markdown-supported blog system!

### Heading H3
Some list items:
- First item
- Second item
  - Sub-item A
  - Sub-item B
[/EN]

[TR]
**Kalın (Bold)**, *İtalik (Italic)* ve ~~Üstü Çizili (Strikethrough)~~ metinler. Ayrıca `satır içi kod (inline code)` kullanabilirsiniz.
[/TR]
[EN]
**Bold**, *Italic*, and ~~Strikethrough~~ text. You can also use `inline code` elements.
[/EN]

[TR]
> "Bu bir alıntı bloğudur (blockquote). Okunabilirliği artırmak için kullanılır."
> — Tasarım Rehberi
[/TR]
[EN]
> "This is a blockquote. It is used to increase readability."
> — Design Guideline
[/EN]

[TR]
#### Tablo Desteği
[/TR]
[EN]
#### Table Support
[/EN]

| Özellik / Feature | TR | EN |
| ----------------- | -- | -- |
| Başlık (Title) | Evet | Yes |
| Kod (Code) | Evet | Yes |
| Tablo (Table) | Evet | Yes |

[TR]
Aşağıdaki kod bloğu dillerden bağımsız olarak ortaktır. Yalnızca üstündeki veya altındaki metinler çevrilir.
[/TR]
[EN]
The code block below is common and language-independent. Only the texts above or below it are translated.
[/EN]

```typescript:ExampleComponent.tsx
import React, { useState } from 'react';

// Bu bir kod bloğu örneğidir. (This is a code block example)
export function Example() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

import React, { useState } from 'react';

// Bu bir kod bloğu örneğidir. (This is a code block example)
export function Example() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

import React, { useState } from 'react';

// Bu bir kod bloğu örneğidir. (This is a code block example)
export function Example() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

import React, { useState } from 'react';

// Bu bir kod bloğu örneğidir. (This is a code block example)
export function Example() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

[TR]
Sonuç olarak, `[TR]` ve `[EN]` etiketlerini kullanarak tek bir markdown dosyasında iki dili desteklemek çok kolay!
[/TR]
[EN]
In conclusion, it's very easy to support two languages in a single markdown file using the `[TR]` and `[EN]` tags!
[/EN]
