Tag.create(
  [
    { name: 'Реле времени' },
    { name: 'Реле контроля' },
    { name: 'Контакторы' },
    { name: 'Автоматические выключатели' },
    { name: 'Измеряющие преобразователи' },
    { name: 'Modbus' },
    { name: 'УПП' },
    { name: 'Реле' },
    { name: 'Экономия пространства' }
  ]
)

Scope.create(
  [
    { name: 'Насосы и двигатели' },
    { name: 'Альтернативная энергетика' },
    { name: 'Энергосбережение и жкх' },
    { name: 'Производство' },
    { name: 'Мобильность' },
    { name: 'Прочие примеры' }
  ]
)

Example.create(
  [
    {
      scope_id: 1,
      product_id: 274,
      title: 'Защита насоса от сухого хода',
      issue: 'Pumps that are used to move polluted liquids or water with lots of loose particles tend to loose efficiency after many hours of operation. That forces you to clean the impeller wheel. Cleaning the impeller is sometimes very quirky or nearly impossible as modern pumps are closed units. A cleaning procedure without external access would be very helpful.',
      solution: 'Pumps that are used to move polluted liquids or water with lots of loose particles tend to loose efficiency after many hours of operation. That forces you to clean the impeller wheel. Cleaning the impeller is sometimes very quirky or nearly impossible as modern pumps are closed units. A cleaning procedure without external access would be very helpful.',
      advantages: "- используем двигатель как датчик!
                  - не требуется дополнительных приспособлений, проводов
                  - не требует регулярного обслуживания и чистки (в отличие от погружных датчиков)
                  - надежно закрыто в щите и защищено от изменения параметров
                  - не может быть незаметного обрыва провода, т.к. параметры измеряются в цепи питания насоса (надежно!)
                  - простое решение, легко подстраивается под мощность насоса при помощи трансформатора тока (достаточно одного трансформатора тока на один насос)"
    }
  ]
)
