---
title: Unity kPooling paketinin kullanımı
date: 2021-05-27
tags: [unity, object-pooling, kPooling]
lang: tr
---

Object pooling, sahnede sürekli yaratılıp yok edilen nesnelerin maliyetini ortadan kaldırmanın en temiz yolu. Bu yazıda kPooling paketini sonsuz koşu prototipime nasıl entegre ettiğimi adım adım anlatacağım.

Önce havuzu ısıtıyoruz — ilk frame'de spawn maliyeti ödememek için `WarmUp()` çağrısı yeterli:

```csharp:ObstacleSpawner.cs
var pool = KPoolingManager.Instance.GetPool<Obstacle>();
pool.WarmUp(64);  // pre-warm, GC sıfır

var obstacle = pool.Rent(spawnPoint.position);
obstacle.OnDespawn(() => pool.Return(obstacle));
// ring-buffer: Rent ↔ Return, alloc yok
```

Dikkat edilmesi gereken nokta: havuz boyutunu sahnenin en yoğun anına göre değil, ortalamasına göre seçip taşmayı `Expand` stratejisine bırakmak...
