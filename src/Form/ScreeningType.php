<?php

namespace App\Form;

use App\Entity\Screening;

use Doctrine\DBAL\Types\DateType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type;

class ScreeningType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('start_date', Type\DateType::class, array(
                'widget' => 'single_text',
                'html5' => false,
                'attr' => ['class' => 'datetimepicker'],
            ))
            ->add('price',null, array('attr' => array('class' => 'tesst')))
            ->add('movies')
            ->add('hall')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Screening::class,
        ]);
    }
}
